FROM mcr.microsoft.com/playwright:v1.50.1-noble

WORKDIR /app

COPY package*.json ./

RUN npm ci

RUN npx playwright install --with-deps chromium

COPY . .

RUN mkdir -p playwright-report test-results screenshots && \
    chmod -R 777 playwright-report test-results screenshots

ENV CI=true
ENV NODE_ENV=production

CMD ["npm", "run", "test"] 