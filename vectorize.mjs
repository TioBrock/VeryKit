import { readFileSync, writeFileSync } from 'fs';
import { convertToSvg } from 'vtracer';
import { join } from 'path';

const files = [
  { input: 'VeryKit_Icon.svg', output: 'VeryKit_Icon_Vector.svg', label: 'Ícone' },
  { input: 'VeryKit_Marca.svg', output: 'VeryKit_Marca_Vector.svg', label: 'Marca' },
];

for (const { input, output, label } of files) {
  console.log(`\n=== Processando ${label} ===`);

  const svgContent = readFileSync(input, 'utf-8');

  // Extract base64 PNG data from the SVG
  const base64Match = svgContent.match(/data:image\/png;base64,([A-Za-z0-9+/=]+)/);
  if (!base64Match) {
    console.log(`  Nenhuma imagem base64 encontrada em ${input}`);
    continue;
  }

  const base64Data = base64Match[1];
  const pngBuffer = Buffer.from(base64Data, 'base64');

  // Write temporary PNG
  const tmpPng = `tmp_${label.toLowerCase()}.png`;
  writeFileSync(tmpPng, pngBuffer);
  console.log(`  PNG extraído: ${tmpPng} (${pngBuffer.length} bytes)`);

  // Convert PNG to SVG using vtracer
  try {
    const svgResult = await convertToSvg({
      inputPath: tmpPng,
      // vtracer options for better quality
      colormode: 'color',
      hierarchical: 'stacked',
      mode: 'spline',
      filter_speckle: 4,
      color_precision: 6,
      layer_difference: 16,
      corner_threshold: 60,
      length_threshold: 4.0,
      max_iterations: 10,
      splice_threshold: 45,
      path_precision: 3,
    });

    writeFileSync(output, svgResult);
    console.log(`  SVG vetorial criado: ${output} (${svgResult.length} bytes)`);
  } catch (err) {
    console.error(`  Erro ao vetorizar ${label}:`, err.message);
  }
}

console.log('\n=== Concluído ===');
