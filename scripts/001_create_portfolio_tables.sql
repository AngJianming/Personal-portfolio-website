-- Portfolio Database Schema
-- Creates tables for profiles, projects, marketplace, analytics, and visitors

-- Profiles table for user management
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  is_admin BOOLEAN DEFAULT FALSE,
  github_username TEXT,
  linkedin_url TEXT,
  bio TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Open Source Projects (from GitHub)
CREATE TABLE IF NOT EXISTS public.opensource_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  repo_name TEXT NOT NULL,
  description TEXT,
  stars INTEGER DEFAULT 0,
  forks INTEGER DEFAULT 0,
  language TEXT,
  topics TEXT[],
  html_url TEXT,
  homepage TEXT,
  is_featured BOOLEAN DEFAULT FALSE,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Marketplace Projects (Closed Source)
CREATE TABLE IF NOT EXISTS public.marketplace_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  long_description TEXT,
  screenshots TEXT[],
  tech_stack TEXT[],
  status TEXT DEFAULT 'coming_soon' CHECK (status IN ('production', 'beta', 'coming_soon')),
  is_visible BOOLEAN DEFAULT TRUE,
  price TEXT,
  demo_url TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Demo Requests for marketplace projects
CREATE TABLE IF NOT EXISTS public.demo_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES public.marketplace_projects(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  email TEXT NOT NULL,
  name TEXT,
  company TEXT,
  message TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'completed', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Visitor Analytics
CREATE TABLE IF NOT EXISTS public.visitors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT NOT NULL,
  ip_address TEXT,
  country TEXT,
  city TEXT,
  device_type TEXT,
  browser TEXT,
  os TEXT,
  referrer TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Page Views
CREATE TABLE IF NOT EXISTS public.page_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  visitor_id UUID REFERENCES public.visitors(id) ON DELETE CASCADE,
  page_path TEXT NOT NULL,
  duration INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Contact Messages
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Site Settings (for admin configuration)
CREATE TABLE IF NOT EXISTS public.site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value JSONB,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.opensource_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.marketplace_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.demo_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.visitors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "profiles_select_own" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "profiles_update_own" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "profiles_insert_own" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Public read for projects (everyone can view)
CREATE POLICY "opensource_projects_public_read" ON public.opensource_projects FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "marketplace_projects_public_read" ON public.marketplace_projects FOR SELECT TO anon, authenticated USING (is_visible = true);

-- Admin policies for projects (admin can do everything)
CREATE POLICY "opensource_projects_admin_all" ON public.opensource_projects FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
);
CREATE POLICY "marketplace_projects_admin_all" ON public.marketplace_projects FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
);

-- Demo requests: users can create, admin can view all
CREATE POLICY "demo_requests_insert" ON public.demo_requests FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "demo_requests_select_own" ON public.demo_requests FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "demo_requests_admin_all" ON public.demo_requests FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
);

-- Analytics: only admin can view
CREATE POLICY "visitors_insert" ON public.visitors FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "visitors_admin_select" ON public.visitors FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
);

CREATE POLICY "page_views_insert" ON public.page_views FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "page_views_admin_select" ON public.page_views FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
);

-- Contact messages: anyone can insert, admin can view/update
CREATE POLICY "contact_messages_insert" ON public.contact_messages FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "contact_messages_admin_all" ON public.contact_messages FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
);

-- Site settings: only admin
CREATE POLICY "site_settings_admin_all" ON public.site_settings FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
);
CREATE POLICY "site_settings_public_read" ON public.site_settings FOR SELECT TO anon, authenticated USING (true);

-- Create profile trigger for new users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url, is_admin)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', NULL),
    COALESCE(NEW.raw_user_meta_data ->> 'avatar_url', NULL),
    COALESCE((NEW.raw_user_meta_data ->> 'is_admin')::boolean, false)
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Insert default site settings
INSERT INTO public.site_settings (key, value) VALUES 
  ('profile', '{"name": "Ang Jianming", "title": "Software AI Engineer", "email": "contact@angjianming.com", "github": "angjianming", "linkedin": "angjianming"}'),
  ('theme', '{"primaryColor": "#14b8a6", "darkMode": true}')
ON CONFLICT (key) DO NOTHING;

-- Insert sample marketplace projects
INSERT INTO public.marketplace_projects (title, description, tech_stack, status, is_visible, display_order) VALUES
  ('AI Code Assistant', 'Enterprise-grade AI coding assistant with context-aware suggestions and multi-language support.', ARRAY['Python', 'TensorFlow', 'FastAPI', 'React'], 'production', true, 1),
  ('Smart Document Analyzer', 'Intelligent document processing system using OCR and NLP for automated data extraction.', ARRAY['Python', 'PyTorch', 'AWS', 'Next.js'], 'beta', true, 2),
  ('Blockchain Analytics Platform', 'Real-time blockchain data analytics and visualization platform for DeFi protocols.', ARRAY['Solidity', 'Node.js', 'GraphQL', 'D3.js'], 'coming_soon', true, 3)
ON CONFLICT DO NOTHING;
