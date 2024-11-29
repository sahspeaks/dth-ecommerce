// src/types/razorpay.d.ts

interface RazorpayOptions {
    key: string;
    amount?: number;
    currency?: string;
    name: string;
    description?: string;
    image?: string;
    order_id: string;
    handler: (response: RazorpayResponse) => void;
    prefill?: {
      name?: string;
      email?: string;
      contact?: string;
    };
    notes?: {
      [key: string]: string;
    };
    theme?: {
      color?: string;
      background_color?: string;
    };
    modal?: {
      backdropclose?: boolean;
      escape?: boolean;
    };
  }
  
  interface RazorpayResponse {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
  }
  
  interface Razorpay {
    new(options: RazorpayOptions): {
      open(): void;
    };
  }
  
  interface Window {
    Razorpay: Razorpay;
  }