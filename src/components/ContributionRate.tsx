import { useState } from "react";
import { Settings, Save, AlertCircle } from "lucide-react";

export default function ContributionRate() {
  const [rate, setRate] = useState<string>("2.5");
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string>("");

  const handleSave = async () => {
    setError("");

    const numRate = parseFloat(rate);
    if (isNaN(numRate) || numRate < 0 || numRate > 10) {
      setError("Please enter a valid rate between 0% and 10%");
      return;
    }

    setIsSaving(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSaving(false);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setRate("2.5");
    setError("");
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <Settings className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900">
            Contribution Rate
          </h2>
        </div>
      </div>

      <div className="p-6">
        <div className="max-w-md">
          <div className="mb-4">
            <label
              htmlFor="rate"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Current Rate
            </label>
            <div className="relative">
              <input
                id="rate"
                type="number"
                step="0.1"
                min="0"
                max="10"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                disabled={!isEditing}
                className={`block w-full px-4 py-3 pr-8 border rounded-lg text-lg font-semibold transition-all duration-200 ${
                  isEditing
                    ? "border-blue-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                    : "border-gray-200 bg-gray-50 text-gray-600"
                } ${error ? "border-red-300" : ""}`}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-500 text-lg font-semibold">%</span>
              </div>
            </div>
            {error && (
              <div className="mt-2 flex items-center space-x-2 text-red-600">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm">{error}</span>
              </div>
            )}
          </div>

          <div className="mb-6">
            <div className="text-sm text-gray-500 mb-2">Impact Preview</div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-gray-600">On $100 purchase:</div>
                  <div className="font-semibold">
                    ${(parseFloat(rate) || 0).toFixed(2)}
                  </div>
                </div>
                <div>
                  <div className="text-gray-600">On $1000 purchase:</div>
                  <div className="font-semibold">
                    ${((parseFloat(rate) || 0) * 10).toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex space-x-3">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                <Settings className="w-4 h-4 mr-2" />
                Edit Rate
              </button>
            ) : (
              <>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isSaving ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save
                    </>
                  )}
                </button>
                <button
                  onClick={handleCancel}
                  disabled={isSaving}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Cancel
                </button>
              </>
            )}
          </div>

          <div className="mt-4 text-xs text-gray-500">
            The contribution rate determines the percentage applied to each
            approved purchase. This rate should be between 0% and 10%.
          </div>
        </div>
      </div>
    </div>
  );
}
