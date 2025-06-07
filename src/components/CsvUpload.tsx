
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, FileText, AlertCircle, CheckCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import Papa from 'papaparse';

interface CsvUploadProps {
  onProductsUploaded: (products: any[]) => void;
}

const CsvUpload = ({ onProductsUploaded }: CsvUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
      toast({
        title: "Invalid file type",
        description: "Please upload a CSV file",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    setUploadStatus('idle');

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        try {
          const products = results.data.map((row: any, index: number) => {
            // Validate required fields
            if (!row.productName || !row.categoryName || !row.productId) {
              throw new Error(`Missing required fields in row ${index + 1}`);
            }

            return {
              id: row.productId || `CSV-${Date.now()}-${index}`,
              name: row.productName,
              category: row.categoryName,
              currentStock: parseInt(row.holdingCapacity) || 0,
              minimumStock: Math.floor((parseInt(row.holdingCapacity) || 0) * 0.2), // 20% of holding capacity
              maxStock: parseInt(row.holdingCapacity) || 1000,
              location: row.location || 'Unknown Location',
              locationId: row.locationId || 'LOC-001',
              expiryDate: row.expiryDate || 'N/A',
              barcode: row.product_barcode || `BAR-${Date.now()}-${index}`,
              registrationDate: row.registrationDate || new Date().toISOString().split('T')[0],
              packageRegistrationDate: row.packageRegistrationDate || new Date().toISOString().split('T')[0],
              status: (parseInt(row.holdingCapacity) || 0) > 100 ? 'In Stock' : 
                     (parseInt(row.holdingCapacity) || 0) > 20 ? 'Low Stock' : 'Critical',
              lastRestocked: row.packageRegistrationDate || new Date().toISOString().split('T')[0]
            };
          });

          onProductsUploaded(products);
          setUploadStatus('success');
          
          toast({
            title: "Success",
            description: `${products.length} products uploaded successfully`,
          });

          // Reset file input
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
        } catch (error: any) {
          setUploadStatus('error');
          toast({
            title: "Upload Error",
            description: error.message || "Failed to process CSV file",
            variant: "destructive",
          });
        } finally {
          setIsUploading(false);
        }
      },
      error: (error) => {
        setUploadStatus('error');
        setIsUploading(false);
        toast({
          title: "Parse Error",
          description: "Failed to parse CSV file",
          variant: "destructive",
        });
      }
    });
  };

  const downloadTemplate = () => {
    const template = `categoryName,productId,productName,holdingCapacity,packageRegistrationDate,product_barcode,registrationDate,location,locationId,expiryDate
Beverages,PROD-001,Ethiopian Coffee Premium,1250,2024-01-10,BAR-COFFEE-001,2024-01-10,Warehouse A,LOC-A001,2024-06-15
Grains,PROD-002,Organic Teff Grain,180,2024-01-08,BAR-TEFF-002,2024-01-08,Warehouse B,LOC-B001,2024-08-20
Dairy,PROD-003,Fresh Milk 1L,500,2024-01-12,BAR-MILK-003,2024-01-12,Cold Storage,LOC-C001,2024-02-15`;

    const blob = new Blob([template], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'product_template.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5 text-blue-600" />
          Bulk Upload Products
        </CardTitle>
        <CardDescription>
          Upload multiple products at once using a CSV file with the specified format
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            ref={fileInputRef}
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            disabled={isUploading}
            className="flex-1"
          />
          <Button
            variant="outline"
            onClick={downloadTemplate}
            className="flex items-center gap-2"
          >
            <FileText className="h-4 w-4" />
            Download Template
          </Button>
        </div>

        {uploadStatus === 'success' && (
          <div className="flex items-center gap-2 text-green-600 text-sm">
            <CheckCircle className="h-4 w-4" />
            CSV uploaded successfully
          </div>
        )}

        {uploadStatus === 'error' && (
          <div className="flex items-center gap-2 text-red-600 text-sm">
            <AlertCircle className="h-4 w-4" />
            Upload failed. Please check your CSV format.
          </div>
        )}

        <div className="text-sm text-slate-600">
          <p className="font-medium mb-2">CSV Format Requirements:</p>
          <div className="bg-slate-50 p-3 rounded-lg">
            <p className="font-medium text-xs mb-2">Required Columns:</p>
            <ul className="text-xs space-y-1 list-disc list-inside ml-2">
              <li><code>categoryName</code> - Product category</li>
              <li><code>productId</code> - Unique product identifier</li>
              <li><code>productName</code> - Name of the product</li>
              <li><code>holdingCapacity</code> - Stock quantity</li>
              <li><code>packageRegistrationDate</code> - Package registration date (YYYY-MM-DD)</li>
              <li><code>product_barcode</code> - Product barcode</li>
              <li><code>registrationDate</code> - Product registration date (YYYY-MM-DD)</li>
              <li><code>location</code> - Storage location name</li>
              <li><code>locationId</code> - Location identifier</li>
              <li><code>expiryDate</code> - Expiration date (YYYY-MM-DD)</li>
            </ul>
          </div>
          <p className="text-xs mt-2 text-slate-500">
            Click "Download Template" to get a sample CSV file with the correct format.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CsvUpload;
