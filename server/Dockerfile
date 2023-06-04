FROM node:alpine
ENV PORT=3800
ENV MONGO_CONNECTION_STRING="mongodb+srv://team13:team13@developer-journey-map.xx3xnsr.mongodb.net/test4?retryWrites=true&w=majority"
ENV GOOGLE_CLIENT_ID = "799145484325-8o2poeemj5cf56i6lc0m1rb1lmfafrtm.apps.googleusercontent.com"
ENV GOOGLE_CLIENT_SECRET = "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"
ENV GITHUB_CLIENT_ID = "d0e34e16edc85ffb22f7"
ENV GITHUB_CLIENT_SECRET = "99db574f53ea69da627911050f258eef2a304e02"
ENV LINKEDIN_KEY = "86wa2tttlzoers"
ENV LINKEDIN_SECRET = "i8vE4O2CXEPIN129"
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .

EXPOSE 3800

CMD ["node", "index.js"]