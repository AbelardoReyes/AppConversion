import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowRightLeft, Calendar, Clock, Download, Receipt } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Divisa } from "@/components/home/Home.tsx";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ReactNode, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface CurrencyExchangeTicketProps {
  fromCurrency: Divisa;
  fromAmount: number;
  toCurrency: Divisa;
  trigger?: ReactNode;
}

const CurrencyExchangeTicket = ({
                                  fromCurrency,
                                  toCurrency,
                                  fromAmount,
                                  trigger
                                }: CurrencyExchangeTicketProps) => {
  const ticketRef = useRef<HTMLDivElement>(null);
  const currentDate = new Date().toLocaleDateString();
  const currentTime = new Date().toLocaleTimeString();
  const ticketNumber = Math.random().toString(36).substring(2, 10).toUpperCase();

  // Calculate exchange rate and total
  const exchangeRate = toCurrency.valueInDollar / fromCurrency.valueInDollar;
  const totalAmount = fromAmount * exchangeRate;

  const handleDownload = async () => {
    if (ticketRef.current) {
      try {
        // Create canvas from the ticket element
        const canvas = await html2canvas(ticketRef.current, {
          scale: 2,
          backgroundColor: "#ffffff"
        });

        // Create PDF
        const pdf = new jsPDF({
          format: "a4",
          unit: "px"
        });

        // Add image to PDF
        const imgData = canvas.toDataURL("image/png");
        const imgWidth = 450;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 20, 20, imgWidth, imgHeight);

        // Download PDF
        pdf.save(`exchange-ticket-${ticketNumber}.pdf`);
      } catch (error) {
        console.error("Error generating PDF:", error);
      }
    }
  };

  const TicketContent = () => (
    <Card ref={ticketRef} className="w-full max-w-lg mx-auto bg-white shadow-lg">
      <CardHeader className="space-y-1 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Receipt className="h-6 w-6 text-gray-500" />
            <h2 className="text-2xl font-bold text-gray-700">Ticket de cambio</h2>
          </div>
          <Button variant="outline" size="icon" className="h-8 w-8" onClick={handleDownload}>
            <Download className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center text-sm text-gray-500 space-x-4">
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span>{currentDate}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{currentTime}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="text-center space-y-2">
            <img
              src={fromCurrency.flag}
              alt={`${fromCurrency.symbol} flag`}
              className="w-16 h-16 rounded-full mx-auto border-2 border-gray-200"
            />
            <div className="space-y-1">
              <p className="text-2xl font-bold">{fromCurrency.symbol}</p>
            </div>
          </div>

          <ArrowRightLeft className="h-8 w-8 text-gray-400" />

          <div className="text-center space-y-2">
            <img
              src={toCurrency.flag}
              alt={`${toCurrency.symbol} flag`}
              className="w-16 h-16 rounded-full mx-auto border-2 border-gray-200"
            />
            <div className="space-y-1">
              <p className="text-2xl font-bold">{toCurrency.symbol}</p>
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Cantidad</span>
            <span className="font-medium">
              {fromAmount.toLocaleString()} {fromCurrency.symbol}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Tasa de cambio</span>
            <span className="font-medium">
              1 {fromCurrency.symbol} = {exchangeRate.toFixed(4)} {toCurrency.symbol}
            </span>
          </div>
          <Separator />
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Cantidad total</span>
            <span className="font-bold text-base">
              {totalAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })} {toCurrency.symbol}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Valor ({fromCurrency.symbol})</span>
            <span className="font-medium">${fromCurrency.valueInDollar}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Valor ({toCurrency.symbol})</span>
            <span className="font-medium">${toCurrency.valueInDollar}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="bg-gray-50 rounded-b-lg">
        <div className="w-full flex justify-between items-center text-sm">
          <span className="text-gray-500">Folio:</span>
          <span className="font-mono font-medium">{ticketNumber}</span>
        </div>
      </CardFooter>
    </Card>
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || <Button>Generar Ticket de cambio</Button>}
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <TicketContent />
      </DialogContent>
    </Dialog>
  );
};

export default CurrencyExchangeTicket;