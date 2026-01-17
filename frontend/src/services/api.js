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

    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers,
    })

    if (response.status === 401) {
        localStorage.removeItem('token')
        window.location.href = '/login'
    }

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.detail || 'Something went wrong')
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
      return apiCall('/todos/', {
        method: 'POST',
        body: JSON.stringify({ title, description, completed: false }),
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