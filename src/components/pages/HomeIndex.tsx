import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Menu,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { ModeToggle } from "../ModeToggle";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import LanguageSwitcher from "../LanguageSwitcher";
import Image from "next/image";
import Logo from "@/../public/Logo.svg";
import { FeaturesSectionDemo } from "@/components/FeaturesSectionDemo";
import ContactCard from "@/components/ContactCard";
import {Carousel, CarouselContent, CarouselItem} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import InteractiveGrid from "@/components/InteractiveLayer/InteractiveLayer";

export default function HomeIndex() {
  const t = useTranslations("Index");
  const f = useTranslations("Footer");
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();
  const [isRTL, setIsRTL] = useState(false);
  const [isLanguageDialogOpen, setIsLanguageDialogOpen] = useState(false);

  useEffect(() => {
    setIsRTL(document.documentElement.dir === "rtl");

    const hasSelectedLanguage = localStorage.getItem("hasSelectedLanguage");
    if (!hasSelectedLanguage) {
      setIsLanguageDialogOpen(true);
    }
  }, []);

  const handleLanguageSelect = (locale: string) => {
    localStorage.setItem("hasSelectedLanguage", "true");
    const basePath = pathname.startsWith(`/${currentLocale}`)
        ? pathname.replace(`/${currentLocale}`, "")
        : pathname;
    const newPath = `/${locale}${basePath === "/" ? "" : basePath}`;
    router.push(newPath);
    setIsLanguageDialogOpen(false);
  };

  const brands = [
    "/Brand1.png",
    "/Brand2.png",
    "/Brand3.png",
    "/Brand4.png",
    "/Brand5.png",
    "/Brand6.png",
  ]

  // 2. Define the plugin configuration
  const plugin = useRef(
      Autoplay({ delay: 1000, stopOnInteraction: false })
  )

  return (
      <div className="flex flex-col min-h-screen w-full">
        {/* Language Selection Dialog */}
        <Dialog open={isLanguageDialogOpen} onOpenChange={setIsLanguageDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{t("selectLanguage")}</DialogTitle>
              <DialogDescription>{t("chooseLanguagePrompt")}</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Button
                  onClick={() => handleLanguageSelect("en")}
                  variant={currentLocale === "en" ? "default" : "outline"}
              >
                English
              </Button>
              <Button
                  onClick={() => handleLanguageSelect("ar")}
                  variant={currentLocale === "ar" ? "default" : "outline"}
              >
                العربية (Arabic)
              </Button>
            </div>
            <DialogFooter>
              <Button
                  variant="outline"
                  onClick={() => {
                    localStorage.setItem("hasSelectedLanguage", "true");
                    setIsLanguageDialogOpen(false);
                  }}
              >
                {t("close")}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Header */}
        <header
            className="fixed top-0 left-0 right-0 z-50 px-4 lg:px-6 h-16 flex items-center justify-between border-b bg-background">
          <Link className="flex items-center justify-center" href="/">
            <Image src={Logo} width={100} height={100} alt="logo" className="h-6 w-6 m-2 text-primary"/>
            <div className="flex flex-col">
            <span className="font-bold text-xl hidden md:block">{t("boilerplateName")}</span>
            <span className="font-bold text-xl block md:hidden">{t("logo")}</span>
            <p className='text-gray-400 text-xs hidden md:block'>{t("subtitle")}</p>
            </div>
          </Link>
          <div className="flex items-center gap-4 hidden md:block">
            <Button variant="link" asChild>
              <Link href="#hero" className="text-foreground">
                {t('hero')}
              </Link>
            </Button>
            <Button variant="link" asChild>
              <Link href="#about" className="text-foreground">
                {t('about')}
              </Link>
            </Button>
            <Button variant="link" asChild>
              <Link href="#services" className="text-foreground">
                {t('services.title')}
              </Link>
            </Button>
            <Button variant="link" asChild>
              <Link href="#contact" className="text-foreground">
                {t('contact')}
              </Link>
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <LanguageSwitcher/>
            <ModeToggle/>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-6 w-6"/>
                </Button>
              </SheetTrigger>
              <SheetContent side={isRTL ? "right" : "left"} className="w-64">
                <div className="flex flex-col gap-4 mt-6">
                  <SheetClose asChild>
                    <Link href="#hero"
                          className="ml-4 p-2 rounded text-base sm:text-lg text-foreground hover:text-primary hover:font-bold hover:italic hover:bg-primary/20 hover:translate-x-2 transition-all duration-300 ease-in-out">
                      {t("hero")}
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link href="#about"
                          className="ml-4 p-2 rounded text-base sm:text-lg text-foreground hover:text-primary hover:font-bold hover:italic hover:bg-primary/20 hover:translate-x-2 transition-all duration-300 ease-in-out">
                      {t("about")}
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link href="#services"
                          className="ml-4 p-2 rounded text-base sm:text-lg text-foreground hover:text-primary hover:font-bold hover:italic hover:bg-primary/20 hover:translate-x-2 transition-all duration-300 ease-in-out">
                      {t("services.title")}
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link href="#contact"
                          className="ml-4 p-2 rounded text-base sm:text-lg text-foreground hover:text-primary hover:font-bold hover:italic hover:bg-primary/20 hover:translate-x-2 transition-all duration-300 ease-in-out">
                      {t("contact")}
                    </Link>
                  </SheetClose>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </header>

        {/* Main Content */}
        <main className="w-full pt-16">
          {/* Hero Section */}
          <section id="hero" className="w-full pb-8 md:pb-12 lg:pb-20 bg-muted">
            <div className="px-4 sm:px-6 md:px-8 flex flex-col md:flex-row items-center justify-between gap-6">

              {/* CHANGE 1: Responsive Visibility
      - 'hidden': Hides element by default (on mobile)
      - 'md:flex': Shows element as flexbox on medium screens (tablets) and larger
    */}
              <div
                  className="hidden md:flex items-center justify-center my-4 sm:my-0 w-full max-w-[300px] sm:max-w-[400px] md:max-w-[600px] h-[300px] md:h-[600px]">
                <InteractiveGrid/>
              </div>

              <div className="space-y-4 text-center md:text-left w-full">

                <h1 className="premium-funky-text text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tighter">
                  {t("title")}
                </h1>

                <p className="max-w-[600px] mx-auto md:mx-0 text-muted-foreground text-sm sm:text-base md:text-lg">
                  {t("description")}
                </p>

                <Button
                    title=""
                    className="inline-flex hover:scale-105 transition-transform duration-300 ease-out items-center px-8 py-6 text-lg font-semibold text-black bg-yellow-300 rounded-full hover:bg-yellow-400 focus:bg-yellow-400 shadow-lg"
                    role="button"
                >
                  Locate Me 📍
                </Button>
              </div>
            </div>
          </section>
          {/* About Section with Scrollable Cards */}
          <section id="about" className="w-full py-8 md:py-12 lg:py-20">
            <div className="px-4 sm:px-6 md:px-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-center mb-6 text-foreground">
                {t("about")}
              </h2>
              <ScrollArea className=" w-full rounded-md border p-4">
                <div className="space-y-4 text-center">
                  <Card className="shadow-lg relative overflow-hidden bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">

                    <CardContent>
                      <p className="text-muted-foreground text-sm sm:text-base">{t("aboutDescription")}</p>
                    </CardContent>
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-primary/10 opacity-0 hover:opacity-100 transition-opacity duration-300" />
                  </Card>
                </div>
              </ScrollArea>
            </div>
          </section>

          {/* Services Section with Updated BentoGrid */}
          <section id="services" className="w-full py-8 md:py-12 lg:py-20 bg-muted">
            <div className="px-4 sm:px-6 md:px-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-center mb-6 text-foreground">
                {t("services.title")}
              </h2>
              <FeaturesSectionDemo/>
            </div>
          </section>
          <Separator className="my-1"/>

          {/* Carousel */}
          <section id="brands" className="w-full py-8 md:py-12 lg:py-20 bg-muted/20">
            <h2 className="align-center text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tighter text-center mb-6 text-foreground">
              {t("currentcust")}
            </h2><br/>
            <h2 className="mx-12 align-center text-md sm:text-lg md:text-xl lg:text-2xl tracking-tighter text-center mb-6 text-foreground">
              {t("currentcustDesp")}
            </h2>
            <div className="container mx-auto px-4">
              <Carousel
                  plugins={[plugin.current]}
                  className="w-full"
                  opts={{
                    align: "start",
                    loop: true,
                  }}
              >
                <CarouselContent className="-ml-2 md:-ml-4">
                  {brands.map((brandPath, index) => (
                      <CarouselItem
                          key={index}
                          // Responsive basis: 2 items on mobile, 4 on tablet, 6 on desktop
                          className="pl-2 md:pl-4 basis-1/2 md:basis-1/4 lg:basis-1/6"
                      >
                        <div className="p-1">
                          <Card className="shadow-none border-none bg-transparent">
                            <CardContent className="flex aspect-[3/2] items-center justify-center p-6">
                              {/* Using standard img tag for simplicity, or use Next.js <Image> */}
                              <img
                                  src={brandPath}
                                  alt={`Brand ${index + 1}`}
                                  className="h-full w-full object-contain grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
                              />
                            </CardContent>
                          </Card>
                        </div>
                      </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          </section>
          <Separator className="my-1"/>

          {/* Contact Section */}
          <section id="contact" className="w-full py-8 md:py-12 lg:py-20">
            <div className="px-4 sm:px-6 md:px-8">
              <h2 className="text-2xl sm:text-7xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-center mb-6 text-foreground">
                {t("contact")}
              </h2>
              <div className="max-w-2xl mx-auto space-y-6">
                <div className="space-y-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Phone className="h-5 w-5 text-primary"/>
                    <p className="text-muted-foreground text-sm sm:text-base">{t("phone")}</p>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Mail className="h-5 w-5 text-primary"/>
                    <p className="text-muted-foreground text-sm sm:text-base">{t("email")}</p>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    <p className="text-muted-foreground text-sm sm:text-base">{t("address")}</p>
                  </div>
                </div>
<ContactCard/>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="py-6 px-4 sm:px-6 md:px-8 border-t">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">{f("copyright")}</p>
          </div>
        </footer>
      </div>
  );
}
