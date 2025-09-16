"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, X } from "lucide-react";

export default function PasswordStrengthChecker() {
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState({
    score: 0,
    label: "",
    color: ""
  });
  const [criteria, setCriteria] = useState([
    { id: 1, text: "At least 8 characters", met: false },
    { id: 2, text: "Contains uppercase letter", met: false },
    { id: 3, text: "Contains lowercase letter", met: false },
    { id: 4, text: "Contains a number", met: false },
    { id: 5, text: "Contains special character", met: false }
  ]);

  // Calculate password strength
  useEffect(() => {
    let score = 0;
    const newCriteria = [...criteria];
    
    // Check length
    newCriteria[0].met = password.length >= 8;
    if (newCriteria[0].met) score += 1;
    
    // Check uppercase
    newCriteria[1].met = /[A-Z]/.test(password);
    if (newCriteria[1].met) score += 1;
    
    // Check lowercase
    newCriteria[2].met = /[a-z]/.test(password);
    if (newCriteria[2].met) score += 1;
    
    // Check number
    newCriteria[3].met = /\d/.test(password);
    if (newCriteria[3].met) score += 1;
    
    // Check special character
    newCriteria[4].met = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    if (newCriteria[4].met) score += 1;
    
    setCriteria(newCriteria);
    
    // Update strength based on score
    let label = "";
    let color = "";
    
    if (score <= 2) {
      label = "Weak";
      color = "bg-red-500";
    } else if (score <= 3) {
      label = "Fair";
      color = "bg-orange-500";
    } else if (score <= 4) {
      label = "Good";
      color = "bg-yellow-500";
    } else {
      label = "Strong";
      color = "bg-green-500";
    }
    
    setStrength({ score, label, color });
  }, [password]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Password Strength Checker</CardTitle>
          <CardDescription>
            Enter a password to check its strength
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="py-6"
            />
          </div>

          {/* Strength Indicator */}
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm font-medium">Password Strength</span>
              <span className={`font-semibold ${strength.label === 'Weak' ? 'text-red-500' : strength.label === 'Fair' ? 'text-orange-500' : strength.label === 'Good' ? 'text-yellow-500' : 'text-green-500'}`}>
                {strength.label}
              </span>
            </div>
            <div className="flex h-3 w-full gap-1">
              {[1, 2, 3, 4, 5].map((_, i) => (
                <div 
                  key={i}
                  className={`flex-1 rounded-full ${i < strength.score ? strength.color : 'bg-gray-200'}`}
                />
              ))}
            </div>
          </div>

          {/* Criteria Feedback */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Password Requirements</h3>
            <ul className="space-y-2">
              {criteria.map((criterion) => (
                <li key={criterion.id} className="flex items-center text-sm">
                  {criterion.met ? (
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                  ) : (
                    <X className="h-4 w-4 text-gray-400 mr-2" />
                  )}
                  <span className={criterion.met ? "text-green-600" : "text-gray-500"}>
                    {criterion.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tips */}
          <div className="text-xs text-gray-500 pt-2">
            <p>Tip: Use a mix of uppercase, lowercase, numbers, and symbols for stronger passwords.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
