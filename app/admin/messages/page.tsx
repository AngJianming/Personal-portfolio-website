"use client"

import React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search,
  Mail,
  MailOpen,
  Trash2,
  Reply,
  Star,
  Clock,
  X,
  ChevronLeft,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface Message {
  id: string
  name: string
  email: string
  subject: string
  message: string
  created_at: string
  read: boolean
  starred: boolean
}

const initialMessages: Message[] = [
  {
    id: "1",
    name: "Sarah Chen",
    email: "sarah@techcorp.com",
    subject: "AI Consulting Inquiry",
    message: "Hi Jianming,\n\nI came across your portfolio and was impressed by your work on LLM applications. We're looking for an AI consultant to help us implement a conversational AI system for our customer support.\n\nWould you be available for a call this week to discuss the project scope?\n\nBest regards,\nSarah",
    created_at: "2024-01-15T10:30:00Z",
    read: false,
    starred: true,
  },
  {
    id: "2",
    name: "Michael Torres",
    email: "m.torres@startup.io",
    subject: "Collaboration Opportunity",
    message: "Hello,\n\nI'm the CTO at a Series A startup building developer tools. We're interested in integrating AI capabilities and would love to explore a potential collaboration.\n\nLet me know if you'd be interested in learning more.\n\nCheers,\nMichael",
    created_at: "2024-01-15T08:15:00Z",
    read: false,
    starred: false,
  },
  {
    id: "3",
    name: "Emma Wilson",
    email: "emma.w@university.edu",
    subject: "Research Partnership",
    message: "Dear Mr. Ang,\n\nI'm a PhD student researching efficient training methods for large language models. Your open-source contributions have been invaluable to our work.\n\nWe're looking for industry partners for our upcoming research project. Would you be interested in discussing a potential collaboration?\n\nBest,\nEmma",
    created_at: "2024-01-14T16:45:00Z",
    read: true,
    starred: false,
  },
  {
    id: "4",
    name: "David Kim",
    email: "david.kim@venture.capital",
    subject: "Speaking Opportunity",
    message: "Hi Jianming,\n\nWe're organizing an AI Summit next month and would love to have you as a speaker. The event will bring together leading AI practitioners and investors.\n\nPlease let me know if you'd be interested.\n\nRegards,\nDavid",
    created_at: "2024-01-13T09:00:00Z",
    read: true,
    starred: true,
  },
]

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const [filter, setFilter] = useState<"all" | "unread" | "starred">("all")

  const filteredMessages = messages.filter((msg) => {
    const matchesSearch =
      msg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.email.toLowerCase().includes(searchQuery.toLowerCase())
    
    if (filter === "unread") return matchesSearch && !msg.read
    if (filter === "starred") return matchesSearch && msg.starred
    return matchesSearch
  })

  const unreadCount = messages.filter((m) => !m.read).length

  const handleSelectMessage = (message: Message) => {
    setSelectedMessage(message)
    if (!message.read) {
      setMessages(messages.map((m) => (m.id === message.id ? { ...m, read: true } : m)))
    }
  }

  const handleToggleStar = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation()
    setMessages(messages.map((m) => (m.id === id ? { ...m, starred: !m.starred } : m)))
    if (selectedMessage?.id === id) {
      setSelectedMessage({ ...selectedMessage, starred: !selectedMessage.starred })
    }
  }

  const handleDelete = (id: string) => {
    setMessages(messages.filter((m) => m.id !== id))
    if (selectedMessage?.id === id) {
      setSelectedMessage(null)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 24) {
      return diffInHours < 1 ? "Just now" : `${diffInHours}h ago`
    }
    if (diffInHours < 48) {
      return "Yesterday"
    }
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
  }

  return (
    <div className="p-6 lg:p-8 h-screen flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1 flex flex-col min-h-0"
      >
        <div className="mb-6">
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Messages</h1>
          <p className="text-muted-foreground mt-1">
            {unreadCount > 0 ? `${unreadCount} unread messages` : "All messages read"}
          </p>
        </div>

        <div className="flex-1 flex gap-6 min-h-0">
          {/* Message List */}
          <div
            className={`flex flex-col w-full lg:w-96 min-h-0 ${
              selectedMessage ? "hidden lg:flex" : "flex"
            }`}
          >
            {/* Search and Filters */}
            <div className="space-y-4 mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search messages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-secondary/50"
                />
              </div>
              <div className="flex gap-2">
                {(["all", "unread", "starred"] as const).map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFilter(f)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium capitalize transition-colors ${
                      filter === f
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary/50 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto space-y-2">
              {filteredMessages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <button
                    type="button"
                    onClick={() => handleSelectMessage(message)}
                    className={`w-full text-left p-4 rounded-xl transition-all ${
                      selectedMessage?.id === message.id
                        ? "bg-primary/10 border border-primary/30"
                        : "bg-card/50 border border-border hover:border-primary/30"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <span className="text-sm font-medium text-primary">
                          {message.name.split(" ").map((n) => n[0]).join("")}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p
                            className={`font-medium truncate ${
                              !message.read ? "text-foreground" : "text-muted-foreground"
                            }`}
                          >
                            {message.name}
                          </p>
                          {!message.read && (
                            <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                          )}
                        </div>
                        <p
                          className={`text-sm truncate ${
                            !message.read ? "text-foreground" : "text-muted-foreground"
                          }`}
                        >
                          {message.subject}
                        </p>
                        <p className="text-xs text-muted-foreground truncate mt-1">
                          {message.message.substring(0, 60)}...
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-2 shrink-0">
                        <span className="text-xs text-muted-foreground">
                          {formatDate(message.created_at)}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => handleToggleStar(message.id, e)}
                          className={`p-1 rounded transition-colors ${
                            message.starred
                              ? "text-yellow-500"
                              : "text-muted-foreground hover:text-yellow-500"
                          }`}
                          aria-label={message.starred ? "Unstar" : "Star"}
                        >
                          <Star className={`w-4 h-4 ${message.starred ? "fill-current" : ""}`} />
                        </button>
                      </div>
                    </div>
                  </button>
                </motion.div>
              ))}

              {filteredMessages.length === 0 && (
                <div className="text-center py-12">
                  <Mail className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No messages found</p>
                </div>
              )}
            </div>
          </div>

          {/* Message Detail */}
          <AnimatePresence mode="wait">
            {selectedMessage ? (
              <motion.div
                key={selectedMessage.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="flex-1 flex flex-col min-h-0"
              >
                <Card className="flex-1 bg-card/50 border-border flex flex-col min-h-0">
                  <div className="p-6 border-b border-border">
                    <div className="flex items-center gap-4 mb-4">
                      <button
                        type="button"
                        onClick={() => setSelectedMessage(null)}
                        className="lg:hidden p-2 rounded-lg hover:bg-secondary"
                        aria-label="Back to messages"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <div className="flex-1">
                        <h2 className="text-xl font-semibold text-foreground">
                          {selectedMessage.subject}
                        </h2>
                        <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          {new Date(selectedMessage.created_at).toLocaleString()}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleToggleStar(selectedMessage.id)}
                          className={`p-2 rounded-lg transition-colors ${
                            selectedMessage.starred
                              ? "text-yellow-500 bg-yellow-500/10"
                              : "text-muted-foreground hover:bg-secondary"
                          }`}
                          aria-label={selectedMessage.starred ? "Unstar" : "Star"}
                        >
                          <Star
                            className={`w-5 h-5 ${selectedMessage.starred ? "fill-current" : ""}`}
                          />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(selectedMessage.id)}
                          className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                          aria-label="Delete message"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-lg font-medium text-primary">
                          {selectedMessage.name.split(" ").map((n) => n[0]).join("")}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{selectedMessage.name}</p>
                        <p className="text-sm text-muted-foreground">{selectedMessage.email}</p>
                      </div>
                    </div>
                  </div>
                  <CardContent className="flex-1 overflow-y-auto p-6">
                    <div className="prose prose-invert max-w-none">
                      {selectedMessage.message.split("\n").map((line, i) => (
                        <p key={i} className="text-foreground mb-4">
                          {line}
                        </p>
                      ))}
                    </div>
                  </CardContent>
                  <div className="p-6 border-t border-border">
                    <Button className="gap-2">
                      <Reply className="w-4 h-4" />
                      Reply
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ) : (
              <div className="hidden lg:flex flex-1 items-center justify-center">
                <div className="text-center">
                  <MailOpen className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <p className="text-lg font-medium text-foreground">Select a message</p>
                  <p className="text-muted-foreground">
                    Choose a message from the list to read it
                  </p>
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}
