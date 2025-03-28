
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Briefcase, Building, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Client } from "@/pages/Clients";

const clientFormSchema = z.object({
  name: z.string().min(2, {
    message: "Client Name must be at least 2 characters.",
  }),
  type: z.string().min(1, {
    message: "Please select a client type.",
  }),
  industry: z.string().min(1, {
    message: "Please select an industry.",
  }),
  contact: z.string().min(2, {
    message: "Contact person must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(1, {
    message: "Please enter a phone number.",
  }),
  address: z.string().min(1, {
    message: "Please enter an address.",
  }),
  notes: z.string().optional(),
});

type ClientFormValues = z.infer<typeof clientFormSchema>;

const defaultValues: Partial<ClientFormValues> = {
  name: "",
  type: "",
  industry: "",
  contact: "",
  email: "",
  phone: "",
  address: "",
  notes: "",
};

interface NewClientDialogProps {
  onClientCreated: (client: Client) => void;
}

export function NewClientDialog({ onClientCreated }: NewClientDialogProps) {
  const [open, setOpen] = useState(false);
  
  const form = useForm<ClientFormValues>({
    resolver: zodResolver(clientFormSchema),
    defaultValues,
  });

  function onSubmit(data: ClientFormValues) {
    const newClient = {
      ...data,
      id: Math.floor(Math.random() * 10000),
      casesCount: 0
    };
    
    onClientCreated(newClient);
    form.reset();
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="legal-button-primary">
          <User size={18} className="mr-2" /> Neuer Klient
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Neuen Klienten anlegen</DialogTitle>
          <DialogDescription>
            Geben Sie die Klientendaten unten ein. Alle mit * markierten Felder sind erforderlich.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Klientenname *</FormLabel>
                    <FormControl>
                      <Input placeholder="Klientenname eingeben" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kliententyp *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Kliententyp auswählen" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Staat/Volk/Behörden">Staat/Volk/Behörden</SelectItem>
                        <SelectItem value="Privatrecht/Zivilrecht/Strafrecht">Privatrecht/Zivilrecht/Strafrecht</SelectItem>
                        <SelectItem value="Schule/Wissenschaft/Kultur">Schule/Wissenschaft/Kultur</SelectItem>
                        <SelectItem value="Landesverteidigung">Landesverteidigung</SelectItem>
                        <SelectItem value="Finanzen">Finanzen</SelectItem>
                        <SelectItem value="Öffentliche Werke/Energie/Verkehr">Öffentliche Werke/Energie/Verkehr</SelectItem>
                        <SelectItem value="Gesundheit/Arbeit/Soziales">Gesundheit/Arbeit/Soziales</SelectItem>
                        <SelectItem value="Wirtschaft/Technische Zusammenarbeit">Wirtschaft/Technische Zusammenarbeit</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="industry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Branche *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Branche auswählen" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Finance">Finance</SelectItem>
                        <SelectItem value="Technology">Technology</SelectItem>
                        <SelectItem value="Banking">Banking</SelectItem>
                        <SelectItem value="Insurance">Insurance</SelectItem>
                        <SelectItem value="Real Estate">Real Estate</SelectItem>
                        <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                        <SelectItem value="Healthcare">Healthcare</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contact"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ansprechpartner *</FormLabel>
                    <FormControl>
                      <Input placeholder="Name des Ansprechpartners" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-Mail Adresse *</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="E-Mail eingeben" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefonnummer *</FormLabel>
                    <FormControl>
                      <Input placeholder="Telefonnummer eingeben" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Adresse *</FormLabel>
                  <FormControl>
                    <Input placeholder="Adresse des Klienten eingeben" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notizen</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Optionale Notizen zu diesem Klienten" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter className="mt-6">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Abbrechen
              </Button>
              <Button type="submit">Klient speichern</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
