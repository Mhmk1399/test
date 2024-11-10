import { modifyJsonWithPrompt } from "@/utils/jsonEditor";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

import { SocksProxyAgent } from 'socks-proxy-agent';

export async function POST(req: NextRequest) {
    try {
        // Set up the SOCKS5 proxy agent
        const agent = new SocksProxyAgent('socks5h://127.0.0.1:1081');
  
        // Configure Axios with the proxy agent
        const response = await axios.post(
          'https://api.openai.com/v1/chat/completions',
          await req.json(),
          {
            headers: {
              'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
              'Content-Type': 'application/json',
            },
            httpAgent: agent,
            httpsAgent: agent,
          }
        );
  
        // Send the response back to the client
        return NextResponse.json(response.data, { status: 200 });
    } catch (error) {
        console.error('Error in OpenAI request:', error);
        return NextResponse.json({ error: 'Failed to connect to OpenAI' }, { status: 500 });
    }
}