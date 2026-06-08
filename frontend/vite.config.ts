import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'; //경로 계산을 위해 Node.js 기본 path 모듈 import

export default defineConfig({
  plugins: [react()],
  resolve:{
    alias:{
      //[추가] Vite가 소스코드 내의 '@shared'를 실제 상위 shared 폴더로 연결해 주도록 세팅
      '@shared':path.resolve(__dirname, '../shared')
    }
  },
  server: {
    host: '127.0.0.1',
    port: 5173,

    fs: {
      allow: ['..']
    }
  }
});
