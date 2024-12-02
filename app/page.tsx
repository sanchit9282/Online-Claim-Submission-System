import Link from 'next/link'

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl mb-4">
          Online Claim Submission System
        </h1>
        <p className="text-lg text-gray-600">
          Submit and manage your insurance claims easily and efficiently
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          href="/submit-claim"
          className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <h2 className="text-2xl font-semibold mb-2">Submit a New Claim</h2>
          <p className="text-gray-600">
            Start a new insurance claim for your vehicle
          </p>
        </Link>

        <Link
          href="/manage-claims"
          className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <h2 className="text-2xl font-semibold mb-2">Manage Claims</h2>
          <p className="text-gray-600">
            View and manage your existing claims
          </p>
        </Link>

        <Link
          href="/repair-centers"
          className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <h2 className="text-2xl font-semibold mb-2">Find Repair Centers</h2>
          <p className="text-gray-600">
            Locate nearby approved repair centers
          </p>
        </Link>

        <Link
          href="/profile"
          className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <h2 className="text-2xl font-semibold mb-2">User Profile</h2>
          <p className="text-gray-600">
            View and manage your account details
          </p>
        </Link>
      </div>

      <div className="mt-12 text-center">
        <p className="text-gray-600 mb-4">
          New to our platform?
        </p>
        <div className="space-x-4">
          <Link
            href="/register"
            className="inline-block px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Register
          </Link>
          <Link
            href="/login"
            className="inline-block px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  )
}

