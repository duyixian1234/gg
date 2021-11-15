const BASE_URL = "https://www.toptal.com/developers/gitignore/api/";

async function generateTemplate(items: string[]): Promise<void> {
  if (checkExists()){
    console.error(".gitignore already exists");
    Deno.exit(1);
  }

  const template = await getTemplateContent(items);
  await Deno.writeTextFile("./.gitignore", template);
}

async function getTemplateContent(items: string[]) {
  const url = getUrl(items);
  console.log(`curl -o .gitignore ${url}`);
  const resp = await fetch(url);
  const content = await resp.text();
  return content;
}

function getUrl(items: string[]): string {
  const s = items.join(",");
  const url = `${BASE_URL}${s}`;
  return url;
}


function checkExists():boolean{
  const file = Deno.statSync(".gitignore");
  return file.isFile || file.isDirectory|| file.isSymlink;
}

generateTemplate(Deno.args);