import { useEffect, useState } from "react";
import "./App.css";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { BookOpen, Quote, RefreshCw, Share2 } from "lucide-react";
import axios from "axios";
import { motion } from "framer-motion";

interface Quote {
  author: string;
  quote: string;
}

function App() {
  const [quote, setQuote] = useState<Quote | null>(null);

  useEffect(() => {
    getNewQuote();
  }, []);

  const getNewQuote = async () => {
    const response = await axios.get("https://api.api-ninjas.com/v1/quotes", {
      headers: {
        "X-api-key": "32h5tAjv59Uq8N7BRgsnzQ==WG16UTbOx0t5hwRD"
      }
    });
    setQuote(response.data[0]);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Inspiring Quote",
          text: `"${quote?.quote}" - ${quote?.author}`,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    }
  };

  return (
      <>
        <header className="bg-white shadow-sm">
          <div className="mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <BookOpen className="h-8 w-8 text-indigo-600" />
                <h1 className="ml-2 text-xl font-semibold text-gray-900">Inspira</h1>
              </div>
            </div>
          </div>
        </header>

        <motion.div
            className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-r from-indigo-100 to-indigo-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
        >
          <Card className="w-full max-w-2xl bg-white shadow-xl border-opacity-50 rounded-2xl">
            <CardContent className="pt-12 px-8">
              <div className="relative">
                <Quote className="absolute -top-6 -left-6 w-12 h-12 text-indigo-300" />
                <blockquote className="space-y-4">
                  <motion.p
                      className="text-3xl font-serif text-gray-700 leading-relaxed"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                  >
                    "{quote?.quote}"
                  </motion.p>
                  <footer className="text-lg text-end text-gray-500">— {quote?.author}</footer>
                </blockquote>
              </div>
            </CardContent>
            <CardFooter className="px-8 pb-8 pt-4 flex justify-between items-center">
              <Button
                  variant="outline"
                  size="icon"
                  onClick={handleShare}
                  className="hover:bg-indigo-50"
              >
                <Share2 className="h-4 w-4" />
                <span className="sr-only">Share quote</span>
              </Button>
              <Button
                  onClick={getNewQuote}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                New Quote
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </>
  );
}

export default App;
