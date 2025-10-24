import * as dotenv from "dotenv";
dotenv.config();
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { Pinecone } from "@pinecone-database/pinecone";
import { PineconeStore } from "@langchain/pinecone";

// 1 => index the document :
// => load the doc
// => convert into chunks

const embeddings = new GoogleGenerativeAIEmbeddings({
  apiKey: process.env.GEMINI_API_KEY,
  model: "text-embedding-004",
});

const pinecone = new Pinecone();
const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX_NAME);

export const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
  pineconeIndex,
  maxConcurrency: 5,
});

async function indexDocument() {
  const PDF_PATH = "./NITS3.pdf";
  const pdfLoader = new PDFLoader(PDF_PATH);
  const rawDocs = await pdfLoader.load();

  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });

  const chunkedDocs = await textSplitter.splitDocuments(rawDocs);

  //   console.log(chunkedDocs.length);

  await vectorStore.addDocuments(chunkedDocs);
  // await pineconeIndex.deleteAll();
}

indexDocument();
