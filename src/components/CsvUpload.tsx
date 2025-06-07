
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
            if (!row.name || !row.category || !row.currentStock) {
              throw new Error(`Missing required fields in row ${index + 1}`);
            }

            return {
              id: row.id || `CSV-${Date.now()}-${index}`,
              name: row.name,
              category: row.category,
              currentStock: parseInt(row.currentStock) || 0,
              minimumStock: parseInt(row.minimumStock) || 0,
              maxStock: parseInt(row.maxStock) || 1000,
              location: row.location || 'Warehouse A',
              expiryDate: row.expiryDate || 'N/A',
              status: row.status || 'In Stock',
              lastRestocked: row.lastRestocked || new Date().toISOString().split('T')[0]
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
    const template = `name,category,currentStock,minimumStock,maxStock,location,expiryDate,status,lastRestocked
Ethiopian Coffee Premium,Beverages,1250,500,2000,Warehouse A,2024-06-15,In Stock,2024-01-10
Organic Teff Grain,Grains,180,200,1000,Warehouse B,2024-08-20,Low Stock,2024-01-08`;

    const blob = new Blob([template], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'inventory_template.csv';
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
          Upload multiple products at once using a CSV file
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
            Template
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
          <p className="font-medium mb-1">CSV Format Requirements:</p>
          <ul className="text-xs space-y-1 list-disc list-inside">
            <li>Required fields: name, category, currentStock</li>
            <li>Optional fields: minimumStock, maxStock, location, expiryDate, status, lastRestocked</li>
            <li>Use comma-separated values</li>
            <li>First row should contain column headers</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default CsvUpload;
