export interface Service {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
}

export interface BookingFormValues {
  name: string;
  email: string;
  message: string;
}

export interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}
