
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { AdminBlogPosts } from '@/components/admin/AdminBlogPosts';

const AdminBlog = () => {
  return (
    <AdminLayout>
      <AdminBlogPosts />
    </AdminLayout>
  );
};

export default AdminBlog;
