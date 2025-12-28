'use client';

import React, { useState } from 'react';
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
} from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Send } from 'lucide-react';
import { toast } from 'sonner';
import { InteractiveHoverButton } from '@/components/magicui/interactive-hover-button';
import { useTranslations } from 'next-intl';

// Import your server action
import { sendContactEmail } from '@/app/action';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const ContactDrawer: React.FC = () => {
  const t = useTranslations('Index');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const { name, email, message } = formData;

    // Validation
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error(t('invalid'), {
        className: 'bg-red-500 text-white border-none', // RED STYLE
      });
      return;
    }

    if (!validateEmail(email)) {
      toast.error(t('invalid'), {
        className: 'bg-red-500 text-white border-none', // RED STYLE
      });
      return;
    }

    setIsLoading(true);

    try {
      const result = await sendContactEmail(formData);

      if (result.success) {
        // SUCCESS TOAST
        toast.success(t('success'), {
          className: 'bg-green-500 text-white border-none', // GREEN STYLE
        });

        setFormData({ name: '', email: '', message: '' });
        setOpen(false);
      } else {
        // SERVER ERROR TOAST
        console.error('Server error:', result.error);
        toast.error(t('error'), {
          className: 'bg-red-500 text-white border-none', // RED STYLE
        });
      }
    } catch (error) {
      // CATCH ERROR TOAST
      console.error('Submission error:', error);
      toast.error(t('error'), {
        className: 'bg-red-500 text-white border-none', // RED STYLE
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <div className="flex justify-center items-center">
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <InteractiveHoverButton className="text-lg py-3 px-8 m-2">
              {t('sendMessage')}
            </InteractiveHoverButton>
          </DrawerTrigger>
          <DrawerContent className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 shadow-lg">
            <DrawerHeader>
              <DrawerTitle className="text-lg sm:text-xl md:text-2xl mx-4">
                {t('sendMessage')}
              </DrawerTitle>
            </DrawerHeader>
            <form className="space-y-4 px-4 py-6" onSubmit={handleSubmit}>
              <div className="space-y-2 m-4">
                <Label htmlFor="name" className="text-sm sm:text-base">
                  {t('name')}
                </Label>
                <Input
                    id="name"
                    placeholder={t('namePlaceholder')}
                    value={formData.name}
                    onChange={handleChange}
                    disabled={isLoading}
                />
              </div>
              <div className="space-y-2 m-4">
                <Label htmlFor="email" className="text-sm sm:text-base">
                  {t('email')}
                </Label>
                <Input
                    id="email"
                    type="email"
                    placeholder={t('emailPlaceholder')}
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isLoading}
                />
              </div>
              <div className="space-y-2 m-4">
                <Label htmlFor="message" className="text-sm sm:text-base">
                  {t('message')}
                </Label>
                <Textarea
                    id="message"
                    placeholder={t('messagePlaceholder')}
                    value={formData.message}
                    onChange={handleChange}
                    disabled={isLoading}
                />
              </div>
              <DrawerFooter>
                <Button type="submit" className="w-24 h-12" disabled={isLoading}>
                  <Send className="h-4 w-4 mr-2" />
                  {isLoading ? `${t('submit')}...` : t('submit')}
                </Button>
              </DrawerFooter>
            </form>
          </DrawerContent>
        </Drawer>
      </div>
  );
};

export default ContactDrawer;