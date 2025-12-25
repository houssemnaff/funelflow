"use client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { LogIn, Zap, Code2, Webhook, ArrowRight, CheckCircle2, BarChart3, Menu, X } from "lucide-react"
import { useState } from "react"

export default function HomePage() {
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <BarChart3 className="text-white" size={24} />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-slate-900">FFO</h1>
                <p className="text-xs text-slate-500">Funnel Flow Orchestrator</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <a href="#accueil" className="text-slate-600 hover:text-blue-600 transition">Accueil</a>
              <a href="#fonctionnalites" className="text-slate-600 hover:text-blue-600 transition">Fonctionnalités</a>
              <a href="#tarifs" className="text-slate-600 hover:text-blue-600 transition">Tarifs</a>
              <a href="#contact" className="text-slate-600 hover:text-blue-600 transition">Contact</a>
            </nav>

            {/* Desktop Login Button */}
            <Button
              variant="outline"
              onClick={() => router.push("/login")}
              className="hidden md:flex items-center gap-2"
            >
              <LogIn size={18} />
              Se connecter
            </Button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="md:hidden mt-4 pb-4 flex flex-col gap-4">
              <a href="#accueil" className="text-slate-600 hover:text-blue-600 transition">Accueil</a>
              <a href="#fonctionnalites" className="text-slate-600 hover:text-blue-600 transition">Fonctionnalités</a>
              <a href="#tarifs" className="text-slate-600 hover:text-blue-600 transition">Tarifs</a>
              <a href="#contact" className="text-slate-600 hover:text-blue-600 transition">Contact</a>
              <Button
                variant="outline"
                onClick={() => router.push("/login")}
                className="flex items-center gap-2 justify-center"
              >
                <LogIn size={18} />
                Se connecter
              </Button>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section id="accueil" className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-4 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
            Intelligence d'Orchestration de Conversion
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
            Orchestrez vos conversions avec <span className="text-blue-600">intelligence</span>
          </h1>
          
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            Moteur de décision temps réel pour optimiser chaque parcours client
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
           
            <Button
              size="lg"
              variant="outline"
              onClick={() => router.push("/login")}
              className="flex items-center gap-2"
            >
              <LogIn size={20} />
              Se connecter
            </Button>
          </div>

          {/* Hero Illustration */}
          <Card className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-left">
              <div className="flex-1 p-4 bg-white rounded-lg shadow-sm">
                <p className="text-sm text-slate-500 mb-2">Données utilisateur</p>
                <p className="font-mono text-sm">Score: 85</p>
                <p className="font-mono text-sm">Type: Premium</p>
              </div>
              <ArrowRight className="text-blue-600 rotate-90 md:rotate-0" size={32} />
              <div className="flex-1 p-4 bg-white rounded-lg shadow-sm">
                <p className="text-sm text-slate-500 mb-2">Règle appliquée</p>
                <p className="font-mono text-sm text-green-600">IF score &gt; 80</p>
                <p className="font-mono text-sm text-green-600">THEN redirect</p>
              </div>
              <ArrowRight className="text-blue-600 rotate-90 md:rotate-0" size={32} />
              <div className="flex-1 p-4 bg-white rounded-lg shadow-sm">
                <p className="text-sm text-slate-500 mb-2">Action</p>
                <p className="font-mono text-sm text-blue-600">→ Page Premium</p>
                <p className="font-mono text-sm text-blue-600">+ Email envoyé</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section id="fonctionnalites" className="bg-slate-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-12">
            Pourquoi choisir FFO ?
          </h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="p-6 hover:shadow-lg transition">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="text-green-600" size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Décisions en temps réel
              </h3>
              <p className="text-slate-600 mb-4">
                Latence inférieure à 50ms pour des réponses instantanées
              </p>
              <CheckCircle2 className="text-green-600" size={20} />
            </Card>

            <Card className="p-6 hover:shadow-lg transition">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Code2 className="text-blue-600" size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Règles visuelles
              </h3>
              <p className="text-slate-600 mb-4">
                Créez des règles complexes sans écrire une ligne de code
              </p>
              <CheckCircle2 className="text-green-600" size={20} />
            </Card>

            <Card className="p-6 hover:shadow-lg transition">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Webhook className="text-purple-600" size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Automatisation complète
              </h3>
              <p className="text-slate-600 mb-4">
                Webhooks et intégrations avec vos outils existants
              </p>
              <CheckCircle2 className="text-green-600" size={20} />
            </Card>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-8">
              Exemple concret d'utilisation
            </h2>
            
            <Card className="p-8 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    1
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Utilisateur complète un quiz</p>
                    <p className="text-slate-300 text-sm">Score obtenu: 85/100</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                    2
                  </div>
                  <div>
                    <p className="font-semibold mb-1">FFO évalue la règle</p>
                    <p className="text-slate-300 text-sm font-mono">IF score &gt; 80 THEN action_premium</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                    3
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Actions automatiques</p>
                    <p className="text-slate-300 text-sm">→ Redirection vers page premium offerte</p>
                    <p className="text-slate-300 text-sm">→ Email de félicitations envoyé</p>
                    <p className="text-slate-300 text-sm">→ Webhook déclenché vers votre CRM</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="tarifs" className="bg-blue-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Prêt à optimiser votre funnel ?
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Commencez gratuitement et découvrez la puissance de l'orchestration intelligente
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              onClick={() => router.push("/login")}
              className="bg-white text-blue-600 hover:bg-slate-100"
            >
              Créer un compte gratuit
            </Button>
          
          </div>

          <p className="text-blue-100 text-sm mt-6">
            Déjà client ?{" "}
            <button
              onClick={() => router.push("/login")}
              className="text-white underline hover:text-blue-100"
            >
              Se connecter
            </button>
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-slate-900 text-slate-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-white font-bold mb-4">FFO</h3>
              <p className="text-sm">
                Intelligence d'orchestration de conversion pour optimiser vos funnels
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Liens rapides</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#accueil" className="hover:text-white transition">Accueil</a></li>
                <li><a href="#fonctionnalites" className="hover:text-white transition">Fonctionnalités</a></li>
                <li><a href="#tarifs" className="hover:text-white transition">Tarifs</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition">API</a></li>
                <li><a href="#contact" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Contact</h4>
              <p className="text-sm">contact@ffo.app</p>
              <p className="text-sm">+33 1 23 45 67 89</p>
            </div>
          </div>
          
          <div className="border-t border-slate-800 pt-8 text-center text-sm">
            <p>&copy; 2024 Funnel Flow Orchestrator. Tous droits réservés.</p>
            <div className="mt-2 space-x-4">
              <a href="#" className="hover:text-white transition">Mentions légales</a>
              <a href="#" className="hover:text-white transition">Politique de confidentialité</a>
              <a href="#" className="hover:text-white transition">CGU</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}