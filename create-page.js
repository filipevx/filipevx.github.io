const fs = require('fs');
const replace = require('replace-in-file');

// Função para copiar os arquivos de uma pasta para outra
function copyFiles(sourceDir, targetDir) {
  fs.readdirSync(sourceDir).forEach((file) => {
    fs.copyFileSync(`${sourceDir}/${file}`, `${targetDir}/${file}`);
  });
}

// Função para substituir as variáveis nos arquivos
function replaceVariables(files, replacements) {
  try {
    replace.sync({
      files: files,
      from: replacements.map((replacement) => replacement.from),
      to: replacements.map((replacement) => replacement.to),
    });
    console.log('Substituição de variáveis concluída com sucesso!');
  } catch (error) {
    console.error('Erro ao substituir as variáveis:', error);
  }
}

// Comando createPage
function createPage(nomedaPasta, urlPlanilha, hexPrincipal, tituloPagina, horarioPadrao, textoPagina) {
  const sourceDir = 'exemplo'; // Pasta com os arquivos de exemplo
  const targetDir = nomedaPasta; // Pasta de destino para os arquivos da nova página

  // Verificar se a pasta de destino já existe
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir);
    console.log(`Pasta ${targetDir} criada com sucesso!`);
  } else {
    console.log(`A pasta ${targetDir} já existe. Utilize um nome de pasta diferente.`);
    return;
  }

  // Copiar os arquivos de exemplo para a nova pasta
  copyFiles(sourceDir, targetDir);

  // Substituir as variáveis nos arquivos
  const replacements = [
    {
      files: `${targetDir}/index.html`,
      from: /%URL_PLANILHA%/g,
      to: `${urlPlanilha}`,
    },
    {
      files: `${targetDir}/index.html`,
      from: /%HEX_PRINCIPAL%/g,
      to: `#${hexPrincipal}`,
    },
    {
      files: `${targetDir}/index.html`,
      from: /%TITULO_PAGINA%/g,
      to: tituloPagina,
    },
    {
      files: `${targetDir}/index.html`,
      from: /%HORARIO_PADRAO%/g,
      to: horarioPadrao
    },
    {
      files: `${targetDir}/index.html`,
      from: /%TEXTO_PAGINA%/g,
      to: textoPagina
    }
    
  ];

  replaceVariables(replacements.map((replacement) => replacement.files), replacements);

  console.log(`Página ${targetDir} criada com sucesso!`);
}

// Obter os parâmetros da linha de comando
const [, , nomedaPasta, urlPlanilha, hexPrincipal, tituloPagina, horarioPadrao, textoPagina] = process.argv;

// Verificar se os parâmetros foram fornecidos
if (!nomedaPasta || !urlPlanilha || !hexPrincipal || !tituloPagina || !horarioPadrao || !textoPagina) {
  console.error('Erro: É necessário fornecer os parâmetros nomedaPasta, urlPlanilha,  hexPrincipal, tituloPagina, horarioPadrao e textoPagina.');
  return;
}

// Chamar o comando createPage com os parâmetros fornecidos
createPage(nomedaPasta, urlPlanilha, hexPrincipal, tituloPagina, horarioPadrao, textoPagina);