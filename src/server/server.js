import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import puppeteer from 'puppeteer';
const express = require('express');
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'build')));

// Cache Control
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  res.set('Expires', '-1');
  res.set('Pragma', 'no-cache');
  next();
});


// Web Scraping
async function scrapeJobs() {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  try {
    await page.setDefaultNavigationTimeout(60000);
    await page.setExtraHTTPHeaders({ 'Accept-Language': 'ar-SA' });
    await page.goto('https://sa.linkedin.com/jobs/search?keywords=software&location=Saudi%20Arabia', { waitUntil: 'networkidle0' });
    await page.waitForSelector('.jobs-search__results-list');

    const jobs = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('.jobs-search__results-list > li')).slice(0, 6).map(card => ({
        title: card.querySelector('.base-search-card__title')?.textContent.trim() || '',
        company: card.querySelector('.base-search-card__subtitle')?.textContent.trim() || '',
        location: card.querySelector('.job-search-card__location')?.textContent.trim() || '',
        link: card.querySelector('a')?.href || '',
        postedDate: new Date().toLocaleDateString('ar-SA', { calendar: 'islamic', year: 'numeric', month: 'long', day: 'numeric' })
      }));
    });
    return jobs;
  } catch (error) {
    console.error('Scraping error:', error);
    return [];
  } finally {
    await browser.close();
  }
}

app.get('/api/jobs', async (req, res) => {
  try {
    const scrapedJobs = await scrapeJobs();
    res.json({ success: scrapedJobs.length > 0, jobs: scrapedJobs.length > 0 ? scrapedJobs : [], message: scrapedJobs.length ? '' : 'لايوجد حالياً وظائف تناسب مؤهلك' });
  } catch (error) {
    console.error('API Error:', error);
    res.json({ success: false, message: 'حدث خطأ أثناء جلب الوظائف', jobs: [] });
  }
});

// Serve Frontend
app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'build', 'index.html')));


startServer();