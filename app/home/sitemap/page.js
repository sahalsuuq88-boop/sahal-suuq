import Link from "next/link";

export default function SitemapPage() {
    return (
        <div className="min-h-screen bg-[#FAF8F5] text-[#2D2417] py-16 px-6">
            <div className="mx-auto max-w-3xl bg-white p-8 sm:p-12 rounded-2xl border border-gray-200 shadow-sm">
                <h1 className="text-3xl font-extrabold tracking-tight">Tusaha Shabakadda (Sitemap)</h1>
                <p className="text-xs text-gray-400 mt-2">Liiska dhammaan bogagga ka jira Sahal Suuq</p>

                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <Link href="/" className="p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition font-medium text-[#2D2417]">
                        Bogga Hore (Home)
                    </Link>
                    <Link href="/orders" className="p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition font-medium text-[#2D2417]">
                        Raadraaca Dalabyada (Track Orders)
                    </Link>
                    <Link href="/membership" className="p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition font-medium text-[#2D2417]">
                        Xubinnimada (Membership)
                    </Link>
                    <Link href="/affiliate" className="p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition font-medium text-[#2D2417]">
                        La-hawlgalayaasha (Affiliate)
                    </Link>
                    <Link href="/privacy" className="p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition font-medium text-[#2D2417]">
                        Siyaasadda Khaaska ah (Privacy Policy)
                    </Link>
                    <Link href="/terms" className="p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition font-medium text-[#2D2417]">
                        Shuruudaha Adeegga (Terms of Service)
                    </Link>
                </div>
            </div>
        </div>
    );
}