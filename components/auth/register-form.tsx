"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChevronRight, Check } from "lucide-react"

const RegisterForm =() =>{
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "marketer",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)

  const calculatePasswordStrength = (pass: string) => {
    if (!pass) return 0
    let strength = 0
    if (pass.length >= 8) strength++
    if (/[A-Z]/.test(pass)) strength++
    if (/[0-9]/.test(pass)) strength++
    if (/[^A-Za-z0-9]/.test(pass)) strength++
    return strength
  }

  const passwordStrength = calculatePasswordStrength(formData.password)
  const strengthColor =
    passwordStrength === 0
      ? "bg-muted"
      : passwordStrength === 1
        ? "bg-destructive"
        : passwordStrength === 2
          ? "bg-yellow-500"
          : passwordStrength === 3
            ? "bg-blue-500"
            : "bg-green-500"

  const handleNext = () => {
    const newErrors: Record<string, string> = {}

    if (step === 1) {
      if (!formData.fullName) newErrors.fullName = "Name is required"
      if (!formData.email) newErrors.email = "Email is required"
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Invalid email format"
      }
      if (!formData.password) newErrors.password = "Password is required"
      if (formData.password.length < 8) {
        newErrors.password = "Password must be at least 8 characters"
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match"
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setErrors({})
    setStep(step + 1)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate registration
    setTimeout(() => {
      localStorage.setItem("authToken", "mock-token-" + Date.now())
      localStorage.setItem("userEmail", formData.email)
      localStorage.setItem("userName", formData.fullName)
      localStorage.setItem("userRole", formData.role)
      router.push("/dashboard")
    }, 500)
  }

  const steps = [
    { number: 1, label: "Basic Info" },
    { number: 2, label: "Verify Email" },
    { number: 3, label: "Setup" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-primary/20">
        <CardHeader className="space-y-4">
          <div className="flex justify-between gap-2">
            {steps.map((s) => (
              <div
                key={s.number}
                className={`flex-1 h-1 rounded-full transition-colors ${step >= s.number ? "bg-primary" : "bg-muted"}`}
              />
            ))}
          </div>
          <div className="text-center">
            <CardTitle className="text-2xl">Create Account</CardTitle>
            <CardDescription>
              Step {step} of 3: {steps.find((s) => s.number === step)?.label}
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={
              step === 3
                ? handleSubmit
                : (e) => {
                    e.preventDefault()
                    handleNext()
                  }
            }
            className="space-y-4"
          >
            {step === 1 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  />
                  {errors.fullName && <p className="text-destructive text-sm">{errors.fullName}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Professional Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                  {errors.email && <p className="text-destructive text-sm">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                  {formData.password && (
                    <div className="space-y-1">
                      <div className="flex gap-1">
                        {[...Array(4)].map((_, i) => (
                          <div
                            key={i}
                            className={`h-1 flex-1 rounded-full ${i < passwordStrength ? strengthColor : "bg-muted"}`}
                          />
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {passwordStrength === 0 && "Very weak"}
                        {passwordStrength === 1 && "Weak"}
                        {passwordStrength === 2 && "Fair"}
                        {passwordStrength === 3 && "Good"}
                        {passwordStrength === 4 && "Strong"}
                      </p>
                    </div>
                  )}
                  {errors.password && <p className="text-destructive text-sm">{errors.password}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  />
                  {errors.confirmPassword && <p className="text-destructive text-sm">{errors.confirmPassword}</p>}
                </div>
              </>
            )}

            {step === 2 && (
              <div className="space-y-4 py-4">
                <div className="flex justify-center mb-4">
                  <div className="rounded-full bg-green-500/10 p-4">
                    <Check className="text-green-500" size={32} />
                  </div>
                </div>
                <p className="text-center text-foreground">
                  Verification link sent to <strong>{formData.email}</strong>
                </p>
                <p className="text-center text-sm text-muted-foreground">
                  Check your email to verify your account and continue setup.
                </p>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <select
                    id="role"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
                  >
                    <option value="marketer">Marketer - Can create and modify rules</option>
                    <option value="admin">Admin - Full access</option>
                    <option value="viewer">Viewer - Read only</option>
                  </select>
                </div>
                <p className="text-sm text-muted-foreground">You can change roles later in User Management settings.</p>
              </div>
            )}

            <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isLoading}>
              {step === 3 ? (
                isLoading ? (
                  "Creating account..."
                ) : (
                  "Create Account"
                )
              ) : (
                <>
                  Next <ChevronRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>

            {step > 1 && (
              <Button
                type="button"
                variant="outline"
                className="w-full bg-transparent"
                onClick={() => setStep(step - 1)}
                disabled={isLoading}
              >
                Back
              </Button>
            )}

            {step === 1 && (
              <p className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href="/login" className="text-primary hover:underline">
                  Sign in
                </Link>
              </p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
export default RegisterForm;
