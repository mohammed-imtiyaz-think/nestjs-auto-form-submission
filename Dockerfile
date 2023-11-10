FROM node:16.14.0

RUN apt-get update && \
    apt-get install -y libnss3 libatk-bridge2.0-0 libatk1.0-0 libgtk-3-0 libdrm2 libgbm1 libasound2

WORKDIR /

COPY package.json ./

COPY tsconfig.json ./

RUN npm install

RUN npx playwright install

COPY . .

RUN npm run build

EXPOSE 5000

CMD ["npm", "run", "start"]
