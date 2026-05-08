'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Download, Trash2, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { userApi } from '@/lib/api/user';
import { useAuth } from '@/lib/hooks/useAuth';
import { useAuthStore } from '@/lib/stores/authStore';
import { toast } from 'sonner';
import { MESSAGES } from '@/lib/constants/messages';

export default function PrivacyPage() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const setUser = useAuthStore((s) => s.setUser);
  const [exporting, setExporting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleExport = async () => {
    setExporting(true);
    try {
      const response = await userApi.getMe();
      const blob = new Blob([JSON.stringify(response, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `angi-data-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success('Xuất dữ liệu thành công');
    } catch {
      toast.error(MESSAGES.COMMON.ERROR);
    } finally {
      setExporting(false);
    }
  };

  const handleDeleteAccount = async () => {
    setDeleting(true);
    try {
      await userApi.deleteAccount();
      logout();
    } catch {
      toast.error(MESSAGES.COMMON.ERROR);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="px-4 py-4 md:px-8 md:py-6">
      <div className="mx-auto max-w-2xl">
        <div className="mb-5 flex items-center gap-3">
          <button type="button" onClick={() => router.back()} className="text-gray-500 hover:text-gray-700">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-h2 font-medium">Dữ liệu & quyền riêng tư</h1>
        </div>

        {/* Data export */}
        <section className="mb-6 rounded-lg border border-gray-100 p-4">
          <h2 className="text-body font-medium">Xuất dữ liệu</h2>
          <p className="mt-1 text-body-sm text-gray-500">
            Tải xuống tất cả dữ liệu của bạn (sở thích, lịch sử ăn uống, feedback) dưới dạng JSON.
          </p>
          <Button variant="secondary" className="mt-3" onClick={handleExport} loading={exporting}>
            <Download className="mr-2 h-4 w-4" />
            Xuất dữ liệu
          </Button>
        </section>

        {/* Delete account */}
        <section className="mb-6 rounded-lg border border-red-100 bg-red-50 p-4">
          <h2 className="flex items-center gap-2 text-body font-medium text-red-800">
            <AlertTriangle className="h-4 w-4" />
            Xóa tài khoản
          </h2>
          <p className="mt-1 text-body-sm text-red-700">
            Hành động này không thể hoàn tác. Tất cả dữ liệu của bạn sẽ bị xóa vĩnh viễn.
          </p>

          {!showDeleteConfirm ? (
            <Button variant="danger" className="mt-3" onClick={() => setShowDeleteConfirm(true)}>
              <Trash2 className="mr-2 h-4 w-4" />
              Xóa tài khoản
            </Button>
          ) : (
            <div className="mt-3 rounded-md border border-red-200 bg-white p-3">
              <p className="text-body-sm font-medium text-red-800">
                Bạn có chắc chắn? Nhấn &quot;Xác nhận xóa&quot; để tiếp tục.
              </p>
              <div className="mt-3 flex gap-2">
                <Button variant="danger" onClick={handleDeleteAccount} loading={deleting}>
                  Xác nhận xóa
                </Button>
                <Button variant="secondary" onClick={() => setShowDeleteConfirm(false)}>
                  {MESSAGES.COMMON.CANCEL}
                </Button>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}