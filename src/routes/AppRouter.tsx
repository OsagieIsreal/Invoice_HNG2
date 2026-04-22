import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Home } from '@/pages/Home';
import { CreateInvoice } from '@/pages/CreateInvoice';
import { EditInvoice } from '@/pages/EditInvoice';
import { InvoiceDetailPage } from '@/pages/InvoiceDetail';

export const AppRouter = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new" element={<CreateInvoice />} />
        <Route path="/invoice/:id" element={<InvoiceDetailPage />} />
        <Route path="/edit/:id" element={<EditInvoice />} />
      </Routes>
    </Layout>
  );
};
