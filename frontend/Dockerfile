FROM node:20-alpine

WORKDIR /app
ARG NEXT_PUBLIC_API_BASE_URL
ENV NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL

# Copy only package files first (better caching)
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]