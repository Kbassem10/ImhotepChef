import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import PublicRoute from './components/PublicRoute'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import ForgotPassword from './components/auth/ForgotPassword'
import ResetPassword from './components/auth/ResetPassword'
import Dashboard from './components/main/Dashboard'
import RecipeHistory from './components/main/RecipeHistory'
import LandingPage from './components/main/LandingPage'
import DownloadPage from './components/main/DownloadPage'
import EmailVerification from './components/auth/EmailVerification'
import GoogleCallback from './components/auth/GoogleCallback'
import Profile from './components/profile/Profile'
import EmailChangeVerification from './components/profile/EmailChangeVerification'
import InstallPrompt from './components/pwa/InstallPrompt'
import OfflineIndicator from './components/pwa/OfflineIndicator'
import UpdatePrompt from './components/pwa/UpdatePrompt'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <OfflineIndicator />
          <Routes>
            <Route 
              path="/" 
              element={<LandingPage />} 
            />
            <Route 
              path="/download" 
              element={
                <PublicRoute>
                  <DownloadPage />
                </PublicRoute>
              } 
            />
            <Route 
              path="/login" 
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              } 
            />
            <Route 
              path="/register" 
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              } 
            />
            <Route 
              path="/forgot-password" 
              element={
                <PublicRoute>
                  <ForgotPassword />
                </PublicRoute>
              } 
            />
            <Route 
              path="/reset-password" 
              element={
                <PublicRoute>
                  <ResetPassword />
                </PublicRoute>
              } 
            />
            <Route path="/verify-email/:uid/:token" element={<EmailVerification />} />
            <Route path="/auth/google/callback" element={<GoogleCallback />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/recipe-history" 
              element={
                <ProtectedRoute>
                  <RecipeHistory />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/verify-email-change/:uid/:token/:new_email" 
              element={<EmailChangeVerification />} 
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <InstallPrompt />
          <UpdatePrompt />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
