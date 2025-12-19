/**
 * Authentication API
 * This file provides Firebase Auth-compatible functions using PHP API backend
 */

// Simple session-based auth for PHP backend
// In a real implementation, this would use PHP sessions or JWT tokens

let currentUser: any = null;
let authListeners: Array<(user: any) => void> = [];

// Check if user is logged in (from session/localStorage)
function getStoredUser() {
  if (typeof window === 'undefined') return null;
  
  const stored = localStorage.getItem('auth_user');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return null;
    }
  }
  return null;
}

// Store user in localStorage
function setStoredUser(user: any) {
  if (typeof window === 'undefined') return;
  
  if (user) {
    localStorage.setItem('auth_user', JSON.stringify(user));
  } else {
    localStorage.removeItem('auth_user');
  }
}

// Notify all listeners
function notifyListeners(user: any) {
  authListeners.forEach(listener => {
    try {
      listener(user);
    } catch (error) {
      console.error('Auth listener error:', error);
    }
  });
}

/**
 * Login with email and password
 */
export async function loginWithEmail(email: string, password: string): Promise<void> {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost/el-shrouq/api';
  
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Important for cookies/sessions
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.message || 'Login failed');
    }

    // Store user data
    const user = {
      uid: result.user?.id || result.user?.uid || email,
      email: result.user?.email || email,
      ...result.user,
    };

    currentUser = user;
    setStoredUser(user);
    notifyListeners(user);

    return;
  } catch (error: any) {
    console.error('Login error:', error);
    throw new Error(error.message || 'Login failed. Please check your credentials.');
  }
}

/**
 * Logout current user
 */
export async function logout(): Promise<void> {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost/el-shrouq/api';
  
  try {
    await fetch(`${API_BASE_URL}/auth/logout.php`, {
      method: 'POST',
      credentials: 'include',
    });
  } catch (error) {
    console.error('Logout error:', error);
  }

  currentUser = null;
  setStoredUser(null);
  notifyListeners(null);
}

/**
 * Listen to auth state changes
 */
export function onAuthChange(callback: (user: any) => void): () => void {
  // Add listener
  authListeners.push(callback);

  // Immediately call with current user
  const user = currentUser || getStoredUser();
  if (user) {
    currentUser = user;
  }
  callback(user);

  // Return unsubscribe function
  return () => {
    authListeners = authListeners.filter(listener => listener !== callback);
  };
}

/**
 * Get current user
 */
export function getCurrentUser(): any {
  return currentUser || getStoredUser();
}

// Initialize on client side
if (typeof window !== 'undefined') {
  const stored = getStoredUser();
  if (stored) {
    currentUser = stored;
  }
}

