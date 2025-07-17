import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { cpf } = await req.json()
    
    if (!cpf) {
      return new Response(
        JSON.stringify({ error: 'CPF é obrigatório' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Get the Hub API token from environment variables
    const hubToken = Deno.env.get('HUB_API_TOKEN')
    
    if (!hubToken) {
      return new Response(
        JSON.stringify({ error: 'Token da API não configurado' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Clean CPF (remove dots and dashes)
    const cleanCpf = cpf.replace(/\D/g, '')
    
    // Make request to Hub API
    const hubUrl = `https://ws.hubdodesenvolvedor.com.br/v2/cadastropf/?cpf=${cleanCpf}&token=${hubToken}`
    
    const response = await fetch(hubUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`Hub API error: ${response.status}`)
    }

    const data = await response.json()
    
    // Check if the API returned a successful response
    if (!data.status || data.return !== 'OK') {
      return new Response(
        JSON.stringify({ 
          error: 'Dados não encontrados',
          message: 'CPF não encontrado na base de dados'
        }),
        { 
          status: 404, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Return the Hub API data
    return new Response(
      JSON.stringify(data),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    console.error('Error fetching Hub data:', error)
    
    return new Response(
      JSON.stringify({ 
        error: 'Erro interno do servidor',
        message: error.message 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})