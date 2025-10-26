# Gunakan Node.js image versi LTS
FROM node:18

# Tentukan working directory di dalam container
WORKDIR /app

# Salin file package.json dan package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install -g expo-cli
RUN npm install

# Salin semua file project
COPY . .

# Expose port Expo
EXPOSE 8081

# Jalankan Expo
CMD ["npx", "expo", "start", "--web", "--tunnel"]
