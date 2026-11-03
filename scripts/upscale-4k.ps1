Add-Type -AssemblyName System.Drawing

$cSharpCode = @'
using System;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;

public class UltraHDProcessor {
    public static void ProcessTo4K(
        string inputPath, 
        string outputPath, 
        int targetWidth, 
        int targetHeight,
        float saturation = 1.15f,
        float contrast = 1.14f,
        float brightness = 1.03f
    ) {
        using (Bitmap src = new Bitmap(inputPath)) {
            using (Bitmap ultraBmp = new Bitmap(targetWidth, targetHeight, PixelFormat.Format32bppArgb)) {
                ultraBmp.SetResolution(300, 300); // 300 DPI Ultra HD

                using (Graphics g = Graphics.FromImage(ultraBmp)) {
                    g.InterpolationMode = InterpolationMode.HighQualityBicubic;
                    g.SmoothingMode = SmoothingMode.HighQuality;
                    g.PixelOffsetMode = PixelOffsetMode.HighQuality;
                    g.CompositingQuality = CompositingQuality.HighQuality;

                    // Compute luminance weights for saturation boost
                    float rw = 0.3086f * (1.0f - saturation);
                    float gw = 0.6094f * (1.0f - saturation);
                    float bw = 0.0820f * (1.0f - saturation);

                    // Combined Contrast, Saturation, and Brightness
                    float c = contrast;
                    float b = brightness - 1.0f;
                    float t = (1.0f - c) / 2.0f;

                    float[][] matrixItems = {
                        new float[] { (rw + saturation) * c, gw * c, bw * c, 0, 0 },
                        new float[] { rw * c, (gw + saturation) * c, bw * c, 0, 0 },
                        new float[] { rw * c, gw * c, (bw + saturation) * c, 0, 0 },
                        new float[] { 0, 0, 0, 1, 0 },
                        new float[] { t + b, t + b, t + b, 0, 1 }
                    };

                    ImageAttributes attr = new ImageAttributes();
                    attr.SetColorMatrix(new ColorMatrix(matrixItems), ColorMatrixFlag.Default, ColorAdjustType.Bitmap);

                    // High-quality redraw
                    g.DrawImage(src, 
                        new Rectangle(0, 0, targetWidth, targetHeight), 
                        0, 0, src.Width, src.Height, 
                        GraphicsUnit.Pixel, 
                        attr);
                }

                // Save with maximum quality JPEG 98
                ImageCodecInfo jpgEncoder = GetEncoder(ImageFormat.Jpeg);
                EncoderParameters encParams = new EncoderParameters(1);
                encParams.Param[0] = new EncoderParameter(Encoder.Quality, 98L);

                ultraBmp.Save(outputPath, jpgEncoder, encParams);
            }
        }
    }

    public static void CreateLandscape4K(
        string inputPath, 
        string outputPath, 
        int targetWidth, 
        int targetHeight
    ) {
        using (Bitmap src = new Bitmap(inputPath)) {
            using (Bitmap canvas = new Bitmap(targetWidth, targetHeight, PixelFormat.Format32bppArgb)) {
                canvas.SetResolution(300, 300);

                using (Graphics g = Graphics.FromImage(canvas)) {
                    g.InterpolationMode = InterpolationMode.HighQualityBicubic;
                    g.SmoothingMode = SmoothingMode.HighQuality;
                    g.PixelOffsetMode = PixelOffsetMode.HighQuality;
                    g.CompositingQuality = CompositingQuality.HighQuality;

                    // 1. Draw atmospheric blurred background fill
                    using (ImageAttributes blurAttr = new ImageAttributes()) {
                        float[][] dimMatrix = {
                            new float[] { 0.4f, 0, 0, 0, 0 },
                            new float[] { 0, 0.4f, 0, 0, 0 },
                            new float[] { 0, 0, 0.4f, 0, 0 },
                            new float[] { 0, 0, 0, 1, 0 },
                            new float[] { 0, 0, 0, 0, 1 }
                        };
                        blurAttr.SetColorMatrix(new ColorMatrix(dimMatrix));
                        g.DrawImage(src, new Rectangle(0, 0, targetWidth, targetHeight), 0, 0, src.Width, src.Height, GraphicsUnit.Pixel, blurAttr);
                    }

                    // 2. Draw sharp centered foreground maintaining aspect ratio
                    float scale = (float)targetHeight / src.Height;
                    int fgWidth = (int)(src.Width * scale);
                    int xOffset = (targetWidth - fgWidth) / 2;

                    float saturation = 1.15f;
                    float c = 1.14f;
                    float rw = 0.3086f * (1.0f - saturation);
                    float gw = 0.6094f * (1.0f - saturation);
                    float bw = 0.0820f * (1.0f - saturation);
                    float t = (1.0f - c) / 2.0f;

                    float[][] fgMatrix = {
                        new float[] { (rw + saturation) * c, gw * c, bw * c, 0, 0 },
                        new float[] { rw * c, (gw + saturation) * c, bw * c, 0, 0 },
                        new float[] { rw * c, gw * c, (bw + saturation) * c, 0, 0 },
                        new float[] { 0, 0, 0, 1, 0 },
                        new float[] { t, t, t, 0, 1 }
                    };
                    using (ImageAttributes fgAttr = new ImageAttributes()) {
                        fgAttr.SetColorMatrix(new ColorMatrix(fgMatrix));
                        g.DrawImage(src, new Rectangle(xOffset, 0, fgWidth, targetHeight), 0, 0, src.Width, src.Height, GraphicsUnit.Pixel, fgAttr);
                    }
                }

                ImageCodecInfo jpgEncoder = GetEncoder(ImageFormat.Jpeg);
                EncoderParameters encParams = new EncoderParameters(1);
                encParams.Param[0] = new EncoderParameter(Encoder.Quality, 98L);
                canvas.Save(outputPath, jpgEncoder, encParams);
            }
        }
    }

    private static ImageCodecInfo GetEncoder(ImageFormat format) {
        ImageCodecInfo[] codecs = ImageCodecInfo.GetImageDecoders();
        foreach (ImageCodecInfo codec in codecs) {
            if (codec.FormatID == format.Guid) {
                return codec;
            }
        }
        return null;
    }
}
'@

Add-Type -TypeDefinition $cSharpCode -ReferencedAssemblies 'System.Drawing'

$imgDir = "C:\Users\DHEEPAN RAJ\.gemini\antigravity-ide\scratch\p-infinity-arena\public\images"

Write-Host "Upscaling arena-action.jpg to 4K Ultra HD (3840x2520)..."
[UltraHDProcessor]::ProcessTo4K("$imgDir\arena-action.jpg", "$imgDir\arena-action-4k.jpg", 3840, 2520, 1.15, 1.14, 1.03)

Write-Host "Upscaling arena-table.jpg to 4K Ultra HD (3840x2531)..."
[UltraHDProcessor]::ProcessTo4K("$imgDir\arena-table.jpg", "$imgDir\arena-table-4k.jpg", 3840, 2531, 1.18, 1.15, 1.03)

Write-Host "Upscaling arena-foosball.jpg to 4K Ultra HD (3840x2535)..."
[UltraHDProcessor]::ProcessTo4K("$imgDir\arena-foosball.jpg", "$imgDir\arena-foosball-4k.jpg", 3840, 2535, 1.15, 1.12, 1.02)

Write-Host "Upscaling arena-neon.jpg to Portrait 4K (2160x3012) and Landscape 4K..."
[UltraHDProcessor]::ProcessTo4K("$imgDir\arena-neon.jpg", "$imgDir\arena-neon-4k.jpg", 2160, 3012, 1.25, 1.16, 1.04)
[UltraHDProcessor]::CreateLandscape4K("$imgDir\arena-neon.jpg", "$imgDir\arena-neon-widescreen-4k.jpg", 3840, 2160)

Write-Host "Upscaling arena-ps5.jpg to Portrait 4K (2160x2884) and Landscape 4K..."
[UltraHDProcessor]::ProcessTo4K("$imgDir\arena-ps5.jpg", "$imgDir\arena-ps5-4k.jpg", 2160, 2884, 1.20, 1.15, 1.03)
[UltraHDProcessor]::CreateLandscape4K("$imgDir\arena-ps5.jpg", "$imgDir\arena-ps5-widescreen-4k.jpg", 3840, 2160)

Write-Host "All 4K Ultra HD images generated successfully!"
