const API_URL = 'http://localhost:8000/api'

const getToken = () => localStorage.getItem('token')

const apiCall = async (endpoint, options = {}) => {
    const token = getToken()
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    }

    if (token) {
        headers['Authorization'] = `Token ${token}`
    }

    let response;
    try {
        response = await fetch(`${API_URL}${endpoint}`, {
            ...options,
            headers,
        })
    } catch (error) {
        // Network error - server might be down or CORS issue
        throw new Error('Failed to connect to server. Make sure Django is running on port 8000.')
    }

    if (response.status === 401) {
        localStorage.removeItem('token')
        window.location.href = '/login'
    }

    // Try to parse JSON, but handle cases where response might be empty
    let data;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
        try {
            data = await response.json();
        } catch (e) {
            data = {};
        }
    } else {
        data = {};
    }

    if (!response.ok) {
        // Handle different error formats
        const errorMessage = data.detail || data.error || data.non_field_errors?.[0] || Object.values(data)[0]?.[0] || 'Something went wrong';
        throw new Error(errorMessage);
    }

    return data
}

export const authAPI = {
    register: async (username, password1, password2) => {
        return apiCall('/auth/registration/', {
            method: 'POST',
            body: JSON.stringify({ username, password1, password2 }),
        })
    },

    login: async (username, password) => {
        const data = await apiCall('/auth/login/', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
        })

        if (data.key) {
            localStorage.setItem('token', data.key)
        }

        return data
    },

    logout: async () => {
        await apiCall('/auth/logout/', {
            method: 'POST',
        })
        localStorage.removeItem('token')
    },

    getUser: async () => {
        return apiCall('/auth/user/')
    },
}

export const todoAPI = {
    getAll: async () => {
      return apiCall('/todos/');
    },
  
    create: async (title, description) => {
      const payload = { 
        title, 
        completed: false 
      };
      // Only include description if it's not empty
      if (description && description.trim()) {
        payload.description = description.trim();
      }
      return apiCall('/todos/', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
    },
  
    update: async (id, data) => {
      return apiCall(`/todos/${id}/`, {
        method: 'PATCH',
        body: JSON.stringify(data),
      });
    },
  
    delete: async (id) => {
      return apiCall(`/todos/${id}/`, {
        method: 'DELETE',
      });
    },
  };