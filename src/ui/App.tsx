import React from 'react'
import { parseInput, type Spec } from '../nlu/parse'
import { solve } from '../engine/solve'
import { encodeState, decodeState } from './state'

export default function App(){
  const [input, setInput] = React.useState<string>('sou paladino com 1464 pontos, quero Gift of Life 2, Gran Con 2 e 3 espaços para greater gems')
  const [spec, setSpec] = React.useState<Spec|null>(null)
  const [result, setResult] = React.useState<any|null>(null)
  const [shareUrl, setShareUrl] = React.useState<string>('')

  // Carrega estado da URL (share)
  React.useEffect(()=>{
    const url = new URL(window.location.href)
    const stateParam = url.searchParams.get('state')
    if(stateParam){
      try{
        const restored = decodeState(stateParam)
        if(restored?.input) setInput(restored.input)
        if(restored?.spec) setSpec(restored.spec)
        if(restored?.result) setResult(restored.result)
      }catch(e){ /* ignore */ }
    }
  }, [])

  function onValidate(){
    const parsed = parseInput(input)
    setSpec(parsed)
    const solved = solve(parsed)
    setResult(solved)
    // Gera um link compartilhável que carrega input/spec/resultado
    const code = encodeState({ input, spec: parsed, result: solved })
    const base = window.location.origin + window.location.pathname.replace(/index\.html$/, '')
    const url = base + '?state=' + encodeURIComponent(code)
    setShareUrl(url)
    // Atualiza a barra do navegador também (UX)
    window.history.replaceState(null, '', url)
  }

  async function copy(text:string){
    try{ await navigator.clipboard.writeText(text) }catch(_){}
  }

  return (
    <div className="container">
      <div className="card">
        <h1>Wheel Bot — MVP (100% front-end)</h1>
        <h2>Digite instruções em PT-BR que o bot consegue entender (vocação, pontos, perks e gemas).</h2>

        <label>Instruções (exemplo abaixo)</label>
        <textarea value={input} onChange={e=>setInput(e.target.value)} />

        <div className="row" style={{marginTop:12}}>
          <button className="primary" onClick={onValidate}>Validar & Gerar Link</button>
          <button onClick={()=>copy(input)}>Copiar instruções</button>
        </div>

        {spec && (
          <div className="output">
            <div className="small">Spec:</div>
            <pre>{JSON.stringify(spec, null, 2)}</pre>
          </div>
        )}

        {result && (
          <div className={"output " + (result.ok ? "ok":"bad")}>
            <div><b>{result.ok ? "É possível (DEMO)" : "Não é possível (DEMO)"}</b></div>
            {!result.ok && <div className="small">{result.reason}</div>}
            {result.ok && (
              <>
                <div className="small">Resumo:</div>
                <pre>{JSON.stringify(result.summary, null, 2)}</pre>
                <div className="linkbox">
                  <div><b>Link compartilhável (recarrega este mesmo estado):</b></div>
                  <div style={{wordBreak:'break-all'}}>{shareUrl}</div>
                  <div className="row" style={{marginTop:8}}>
                    <button onClick={()=>copy(shareUrl)}>Copiar link</button>
                  </div>
                  <div className="small" style={{marginTop:8}}>
                    Observação: este MVP ainda <b>não</b> gera o “export code/URL” do planner oficial. 
                    Para isso, você precisará implementar a engine/mapper da Wheel e, se quiser screenshot, um backend.
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
