import { updateSession } from '@/lib/supabase/proxy'
import { type NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const response = await updateSession(request)
  
  // Protect admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const supabaseResponse = response
    // Check if user is authenticated by looking for the session cookie
    const hasSession = request.cookies.has('sb-access-token') || 
      request.cookies.getAll().some(cookie => cookie.name.includes('auth-token'))
    
    // For admin routes, we'll do a proper check in the page component
    // This middleware just ensures session is refreshed
  }
  
  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
