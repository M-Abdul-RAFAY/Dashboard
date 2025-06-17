// API Service Layer for Backend Communication
// Backend should implement these endpoints with the following structure:

/*
Backend API Endpoints Structure:
Note: All authenticated endpoints expect JWT token with payload: { userId, orgId, role }
Backend controllers should access user ID as req.user.userId (not req.user.id)

1. Business Info:
   - GET /api/v1/business-info - Get all business info (requires auth, uses req.user.userId)
   - POST /api/v1/business-info - Create new business info (requires auth, uses req.user.userId)
   - PATCH /api/v1/business-info/:id - Update business info (requires auth, uses req.user.userId)
   - DELETE /api/v1/business-info/:id - Delete business info (requires auth, uses req.user.userId)

2. Templates:
   - GET /api/v1/templates - Get all templates
   - POST /api/v1/templates - Create new template
   - PATCH /api/v1/templates/:id - Update template
   - DELETE /api/v1/templates/:id - Delete template

3. Campaigns:
   - GET /api/v1/campaigns - Get all campaigns
   - POST /api/v1/campaigns - Create new campaign
   - PATCH /api/v1/campaigns/:id - Update campaign
   - DELETE /api/v1/campaigns/:id - Delete campaign

4. Rules:
   - GET /api/v1/rules - Get all rules
   - POST /api/v1/rules - Create new rule
   - PATCH /api/v1/rules/:id - Update rule
   - DELETE /api/v1/rules/:id - Delete rule

5. Integrations:
   - GET /api/v1/integrations - Get all integrations
   - POST /api/v1/integrations - Create new integration
   - PATCH /api/v1/integrations/:id - Update integration
   - DELETE /api/v1/integrations/:id - Delete integration

6. Conversations:
   - GET /api/v1/conversations - Get all conversations
   - POST /api/v1/conversations - Create new conversation
   - PATCH /api/v1/conversations/:id/assign - Assign conversation
   - PATCH /api/v1/conversations/:id/read - Mark as read

7. Messages:
   - GET /api/v1/messages/conversation/:id - Get messages by conversation
   - POST /api/v1/messages - Create new message

8. Chat (Real-time messaging):
   - POST /api/v1/chat/messages - Send message
   - GET /api/v1/chat/messages - Get messages
   - POST /api/v1/chat/sms/send - Send SMS
   - POST /api/v1/chat/sms/receive - Receive SMS (webhook)
   - POST /api/v1/chat/whatsapp/send - Send WhatsApp message
   - POST /api/v1/chat/whatsapp/receive - Receive WhatsApp (webhook)
   - POST /api/v1/chat/voice/send - Send voice message
   - POST /api/v1/chat/voice/receive - Receive voice (webhook)

9. Widget:
   - POST /api/v1/widget - Submit widget form data

10. Customers:
    - GET /api/v1/customers - Get all customers
    - POST /api/v1/customers - Create new customer
    - PATCH /api/v1/customers/:id - Update customer
    - DELETE /api/v1/customers/:id - Delete customer

11. Authentication:
    - POST /api/v1/auth/login - User login
    - POST /api/v1/auth/register - User registration  
    - POST /api/v1/auth/logout - User logout

12. Organizations:
    - GET /api/v1/organizations - Get all organizations
    - POST /api/v1/organizations - Create new organization
    - PATCH /api/v1/organizations/:id - Update organization
    - DELETE /api/v1/organizations/:id - Delete organization

13. Users:
    - GET /api/v1/users - Get all users
    - POST /api/v1/users - Create new user
    - PATCH /api/v1/users/:id - Update user
    - DELETE /api/v1/users/:id - Delete user

14. Calls:
    - GET /api/v1/calls - Get all calls
    - POST /api/v1/calls - Create new call
    - PATCH /api/v1/calls/:id - Update call
    - DELETE /api/v1/calls/:id - Delete call

Backend should return JSON responses with appropriate status codes.
All endpoints should include proper error handling and validation.
Authentication required for most endpoints (except webhook endpoints).
Widget endpoint should create conversation and customer if they don't exist.
*/

const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://your-replit-domain.replit.app"
    : "http://localhost:3001";

// Generic API client
class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private getAuthHeaders(): Record<string, string> {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;

    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...this.getAuthHeaders(),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("API request failed:", error);
      throw error;
    }
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: "GET" });
  }

  async post<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async patch<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: "DELETE" });
  }
}

const apiClient = new ApiClient(API_BASE_URL);

// Type definitions matching backend models
export interface BusinessInfo {
  _id?: string;
  id?: string; // Add id property for frontend compatibility
  name: string;
  website: string;
  description: string;
  phone: string;
  email: string;
  address: string;
  industry: string;
  userId: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Template {
  _id?: string;
  name: string;
  content: string;
  type: "whatsapp" | "sms" | "email" | "call";
  status: "active" | "inactive";
  category: string;
  userId: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Campaign {
  _id?: string;
  name: string;
  scheduleDate: string;
  status: "draft" | "scheduled" | "active" | "completed" | "paused";
  segmentCriteria: string;
  type: "sms" | "email" | "whatsapp" | "push";
  message: string;
  targetAudience: string;
  userId: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Rule {
  _id?: string;
  name: string;
  trigger: string;
  condition: string;
  action: string;
  status: "active" | "inactive";
  priority: number;
  description: string;
  userId: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Integration {
  _id?: string;
  name: string;
  type: string;
  status: "connected" | "disconnected" | "error";
  configuration: Record<string, any>;
  description: string;
  userId: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Message {
  _id?: string;
  conversationId: string;
  sender: string | { userId: string } | "customer" | "AI";
  content: string;
  type: "text" | "note" | "reply" | "file" | "whatsapp" | "sms" | "voice";
  status: "sent" | "delivered" | "failed";
  timestamp?: string;
  isAI?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Conversation {
  _id?: string;
  orgId: string;
  customerId: string;
  channel: "webchat" | "sms" | "facebook" | "whatsapp";
  assignedTo?: string;
  status: "open" | "closed" | "pending";
  lastMessageAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Customer {
  _id?: string;
  orgId: string;
  name: string;
  email?: string;
  phone?: string;
  tags?: string[];
  metadata?: Record<string, any>;
  createdAt?: string;
  updatedAt?: string;
}

export interface Organization {
  _id?: string;
  name: string;
  logoUrl?: string;
  primaryColor?: string;
  settings?: Record<string, any>;
  createdAt?: string;
  updatedAt?: string;
}

export interface User {
  _id?: string;
  name: string;
  email: string;
  role: "admin" | "agent" | "user";
  orgId: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Call {
  _id?: string;
  conversationId: string;
  from: string;
  to: string;
  duration?: number;
  status: "initiated" | "in_progress" | "completed" | "failed";
  recordingUrl?: string;
  transcript?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface WidgetData {
  username: string;
  phone: string;
  message: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  orgId?: string;
  role?: "admin" | "agent" | "user";
}

export interface AuthResponse {
  token: string;
  user: {
    name: string;
    email: string;
    role: string;
  };
}

// Business Info API
export const businessInfoApi = {
  getAll: () => apiClient.get<BusinessInfo[]>("/api/v1/business-info"),
  create: (
    data: Omit<BusinessInfo, "_id" | "userId" | "createdAt" | "updatedAt">
  ) => apiClient.post<BusinessInfo>("/api/v1/business-info", data),
  update: (id: string, data: Partial<BusinessInfo>) =>
    apiClient.patch<BusinessInfo>(`/api/v1/business-info/${id}`, data),
  delete: (id: string) =>
    apiClient.delete<{ message: string }>(`/api/v1/business-info/${id}`),
};

// Templates API
export const templatesApi = {
  getAll: () => apiClient.get<Template[]>("/api/v1/templates"),
  create: (
    data: Omit<Template, "_id" | "userId" | "createdAt" | "updatedAt">
  ) => apiClient.post<Template>("/api/v1/templates", data),
  update: (id: string, data: Partial<Template>) =>
    apiClient.patch<Template>(`/api/v1/templates/${id}`, data),
  delete: (id: string) =>
    apiClient.delete<{ message: string }>(`/api/v1/templates/${id}`),
};

// Campaigns API
export const campaignsApi = {
  getAll: () => apiClient.get<Campaign[]>("/api/v1/campaigns"),
  create: (
    data: Omit<Campaign, "_id" | "userId" | "createdAt" | "updatedAt">
  ) => apiClient.post<Campaign>("/api/v1/campaigns", data),
  update: (id: string, data: Partial<Campaign>) =>
    apiClient.patch<Campaign>(`/api/v1/campaigns/${id}`, data),
  delete: (id: string) =>
    apiClient.delete<{ message: string }>(`/api/v1/campaigns/${id}`),
};

// Rules API
export const rulesApi = {
  getAll: () => apiClient.get<Rule[]>("/api/v1/rules"),
  create: (data: Omit<Rule, "_id" | "userId" | "createdAt" | "updatedAt">) =>
    apiClient.post<Rule>("/api/v1/rules", data),
  update: (id: string, data: Partial<Rule>) =>
    apiClient.patch<Rule>(`/api/v1/rules/${id}`, data),
  delete: (id: string) =>
    apiClient.delete<{ message: string }>(`/api/v1/rules/${id}`),
};

// Integrations API
export const integrationsApi = {
  getAll: () => apiClient.get<Integration[]>("/api/v1/integrations"),
  create: (
    data: Omit<Integration, "_id" | "userId" | "createdAt" | "updatedAt">
  ) => apiClient.post<Integration>("/api/v1/integrations", data),
  update: (id: string, data: Partial<Integration>) =>
    apiClient.patch<Integration>(`/api/v1/integrations/${id}`, data),
  delete: (id: string) =>
    apiClient.delete<{ message: string }>(`/api/v1/integrations/${id}`),
};

// Conversations API
export const conversationsApi = {
  getAll: () => apiClient.get<Conversation[]>("/api/v1/conversations"),
  create: (data: Omit<Conversation, "_id" | "createdAt" | "updatedAt">) =>
    apiClient.post<Conversation>("/api/v1/conversations", data),
  assign: (id: string, data: { assignedTo: string }) =>
    apiClient.patch<Conversation>(`/api/v1/conversations/${id}/assign`, data),
  markAsRead: (id: string) =>
    apiClient.patch<Conversation>(`/api/v1/conversations/${id}/read`, {}),
};

// Messages API
export const messagesApi = {
  getByConversation: (conversationId: string) =>
    apiClient.get<Message[]>(`/api/v1/messages/conversation/${conversationId}`),
  create: (data: Omit<Message, "_id" | "createdAt" | "updatedAt">) =>
    apiClient.post<Message>("/api/v1/messages", data),
};

// Chat API (for real-time messaging)
export const chatApi = {
  sendMessage: (data: {
    conversationId?: string;
    content: string;
    type?: string;
  }) => apiClient.post<Message>("/api/v1/chat/messages", data),
  getMessages: (conversationId?: string) =>
    apiClient.get<Message[]>(
      `/api/v1/chat/messages${
        conversationId ? `?conversationId=${conversationId}` : ""
      }`
    ),

  // SMS endpoints
  sendSMS: (data: { to: string; content: string }) =>
    apiClient.post<{ message: string }>("/api/v1/chat/sms/send", data),

  // WhatsApp endpoints
  sendWhatsApp: (data: { to: string; prompt?: string }) =>
    apiClient.post<{ message: string; aiContent: string }>(
      "/api/v1/chat/whatsapp/send",
      data
    ),

  // Voice endpoints
  sendVoice: (data: { to: string; content: string }) =>
    apiClient.post<{ message: string }>("/api/v1/chat/voice/send", data),
};

// Widget API (for chat support widget)
export const widgetApi = {
  submit: (data: WidgetData) =>
    apiClient.post<{ message: string; conversationId?: string }>(
      "/api/v1/widget",
      data
    ),
};

// Customer API
export const customersApi = {
  getAll: () => apiClient.get<Customer[]>("/api/v1/customers"),
  create: (data: Omit<Customer, "_id" | "createdAt" | "updatedAt">) =>
    apiClient.post<Customer>("/api/v1/customers", data),
  update: (id: string, data: Partial<Customer>) =>
    apiClient.patch<Customer>(`/api/v1/customers/${id}`, data),
  delete: (id: string) =>
    apiClient.delete<{ message: string }>(`/api/v1/customers/${id}`),
};

// Organizations API
export const organizationsApi = {
  getAll: () => apiClient.get<Organization[]>("/api/v1/organizations"),
  create: (data: Omit<Organization, "_id" | "createdAt" | "updatedAt">) =>
    apiClient.post<Organization>("/api/v1/organizations", data),
  update: (id: string, data: Partial<Organization>) =>
    apiClient.patch<Organization>(`/api/v1/organizations/${id}`, data),
  delete: (id: string) =>
    apiClient.delete<{ message: string }>(`/api/v1/organizations/${id}`),
};

// Users API
export const usersApi = {
  getAll: () => apiClient.get<User[]>("/api/v1/users"),
  create: (data: Omit<User, "_id" | "createdAt" | "updatedAt">) =>
    apiClient.post<User>("/api/v1/users", data),
  update: (id: string, data: Partial<User>) =>
    apiClient.patch<User>(`/api/v1/users/${id}`, data),
  delete: (id: string) =>
    apiClient.delete<{ message: string }>(`/api/v1/users/${id}`),
};

// Calls API
export const callsApi = {
  getAll: () => apiClient.get<Call[]>("/api/v1/calls"),
  create: (data: Omit<Call, "_id" | "createdAt" | "updatedAt">) =>
    apiClient.post<Call>("/api/v1/calls", data),
  update: (id: string, data: Partial<Call>) =>
    apiClient.patch<Call>(`/api/v1/calls/${id}`, data),
  delete: (id: string) =>
    apiClient.delete<{ message: string }>(`/api/v1/calls/${id}`),
};

// Authentication API
export const authApi = {
  login: (data: LoginRequest) =>
    apiClient.post<AuthResponse>("/api/v1/auth/login", data),
  register: (data: RegisterRequest) =>
    apiClient.post<AuthResponse>("/api/v1/auth/register", data),
  logout: () => apiClient.post<{ message: string }>("/api/v1/auth/logout", {}),
};

export default apiClient;
