try {
  const response = await fetch('/api/config', { cache: 'no-store' });
  if (!response.ok) throw new Error(`config ${response.status}`);
  window.MUNDINHO_CONFIG = await response.json();
} catch (error) {
  console.warn('Configuração remota indisponível; usando prévia local.', error);
  window.MUNDINHO_CONFIG = {
    supabaseUrl: '',
    supabaseAnonKey: '',
    worldId: 'mundinho-pra-sempre'
  };
}

await import('./lote2-extend.js');
await import('./lote3-extend.js');
await import('./lote3-refine.js');
await import('./app.js');
await import('./lote4-runtime.js');
