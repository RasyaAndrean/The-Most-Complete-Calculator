import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { toast } from 'sonner';

export function CustomCalculatorBuilder() {
  const { language } = useLanguage();
  const [calculators, setCalculators] = useState([]);
  const [currentCalculator, setCurrentCalculator] = useState({
    id: null,
    name: '',
    description: '',
    formula: '',
    variables: [],
    resultLabel: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // Load custom calculators from localStorage
  useEffect(() => {
    const savedCalculators = localStorage.getItem('customCalculators');
    if (savedCalculators) {
      try {
        setCalculators(JSON.parse(savedCalculators));
      } catch (error) {
        console.error('Error parsing custom calculators:', error);
        setCalculators([]);
      }
    }
  }, []);

  // Save calculators to localStorage
  useEffect(() => {
    localStorage.setItem('customCalculators', JSON.stringify(calculators));
  }, [calculators]);

  const handleAddVariable = () => {
    setCurrentCalculator({
      ...currentCalculator,
      variables: [
        ...currentCalculator.variables,
        { name: '', label: '', type: 'number' },
      ],
    });
  };

  const handleVariableChange = (index, field, value) => {
    const updatedVariables = [...currentCalculator.variables];
    updatedVariables[index][field] = value;
    setCurrentCalculator({
      ...currentCalculator,
      variables: updatedVariables,
    });
  };

  const handleRemoveVariable = (index) => {
    const updatedVariables = currentCalculator.variables.filter(
      (_, i) => i !== index
    );
    setCurrentCalculator({
      ...currentCalculator,
      variables: updatedVariables,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!currentCalculator.name.trim()) {
      toast.error(
        language === 'id'
          ? 'Nama kalkulator harus diisi'
          : 'Calculator name is required'
      );
      return;
    }

    if (isEditing) {
      // Update existing calculator
      setCalculators(
        calculators.map((calc) =>
          calc.id === currentCalculator.id ? currentCalculator : calc
        )
      );
      toast.success(
        language === 'id'
          ? 'Kalkulator diperbarui!'
          : 'Calculator updated!'
      );
    } else {
      // Add new calculator
      const newCalculator = {
        ...currentCalculator,
        id: Date.now(),
        createdAt: new Date().toISOString(),
      };
      setCalculators([...calculators, newCalculator]);
      toast.success(
        language === 'id'
          ? 'Kalkulator kustom dibuat!'
          : 'Custom calculator created!'
      );
    }

    // Reset form
    setCurrentCalculator({
      id: null,
      name: '',
      description: '',
      formula: '',
      variables: [],
      resultLabel: '',
    });
    setIsEditing(false);
    setShowForm(false);
  };

  const handleEdit = (calculator) => {
    setCurrentCalculator(calculator);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (
      window.confirm(
        language === 'id'
          ? 'Apakah Anda yakin ingin menghapus kalkulator ini?'
          : 'Are you sure you want to delete this calculator?'
      )
    ) {
      setCalculators(calculators.filter((calc) => calc.id !== id));
      toast.success(
        language === 'id'
          ? 'Kalkulator dihapus!'
          : 'Calculator deleted!'
      );
    }
  };

  const handleShare = (calculator) => {
    // In a real app, this would share the calculator with other users
    // For now, we'll just show a message
    toast.info(
      language === 'id'
        ? 'Fitur berbagi akan segera tersedia!'
        : 'Sharing feature coming soon!'
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {language === 'id'
            ? 'Pembuat Kalkulator Kustom'
            : 'Custom Calculator Builder'}
        </h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          {showForm
            ? language === 'id'
              ? 'Batal'
              : 'Cancel'
            : language === 'id'
            ? 'Buat Kalkulator Baru'
            : 'Create New Calculator'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white dark:bg-gray-800 border rounded-lg p-6 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            {isEditing
              ? language === 'id'
                ? 'Edit Kalkulator'
                : 'Edit Calculator'
              : language === 'id'
              ? 'Buat Kalkulator Baru'
              : 'Create New Calculator'}
          </h3>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'id' ? 'Nama Kalkulator' : 'Calculator Name'} *
                </label>
                <input
                  type="text"
                  value={currentCalculator.name}
                  onChange={(e) =>
                    setCurrentCalculator({
                      ...currentCalculator,
                      name: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                  placeholder={
                    language === 'id'
                      ? 'Masukkan nama kalkulator'
                      : 'Enter calculator name'
                  }
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'id' ? 'Label Hasil' : 'Result Label'}
                </label>
                <input
                  type="text"
                  value={currentCalculator.resultLabel}
                  onChange={(e) =>
                    setCurrentCalculator({
                      ...currentCalculator,
                      resultLabel: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                  placeholder={
                    language === 'id'
                      ? 'Contoh: Luas, Volume, dll.'
                      : 'Example: Area, Volume, etc.'
                  }
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {language === 'id' ? 'Deskripsi' : 'Description'}
              </label>
              <textarea
                value={currentCalculator.description}
                onChange={(e) =>
                  setCurrentCalculator({
                    ...currentCalculator,
                    description: e.target.value,
                  })
                }
                rows={3}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                placeholder={
                  language === 'id'
                    ? 'Deskripsikan fungsi kalkulator ini'
                    : 'Describe what this calculator does'
                }
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {language === 'id' ? 'Formula' : 'Formula'} *
              </label>
              <textarea
                value={currentCalculator.formula}
                onChange={(e) =>
                  setCurrentCalculator({
                    ...currentCalculator,
                    formula: e.target.value,
                  })
                }
                rows={3}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 font-mono"
                placeholder={
                  language === 'id'
                    ? 'Contoh: a * b / 2 (gunakan nama variabel yang didefinisikan di bawah)'
                    : 'Example: a * b / 2 (use variable names defined below)'
                }
                required
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {language === 'id'
                  ? 'Gunakan nama variabel yang didefinisikan di bawah. Contoh: jika Anda memiliki variabel "panjang" dan "lebar", formula bisa berupa "panjang * lebar".'
                  : 'Use variable names defined below. Example: if you have variables "length" and "width", the formula could be "length * width".'}
              </p>
            </div>

            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {language === 'id' ? 'Variabel' : 'Variables'}
                </label>
                <button
                  type="button"
                  onClick={handleAddVariable}
                  className="text-sm bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 px-3 py-1 rounded"
                >
                  {language === 'id' ? 'Tambah Variabel' : 'Add Variable'}
                </button>
              </div>

              {currentCalculator.variables.length === 0 ? (
                <div className="text-center py-4 text-gray-500 dark:text-gray-400">
                  {language === 'id'
                    ? 'Belum ada variabel. Klik "Tambah Variabel" untuk memulai.'
                    : 'No variables yet. Click "Add Variable" to get started.'}
                </div>
              ) : (
                <div className="space-y-3">
                  {currentCalculator.variables.map((variable, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-1 md:grid-cols-12 gap-2 items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                    >
                      <div className="md:col-span-4">
                        <input
                          type="text"
                          value={variable.name}
                          onChange={(e) =>
                            handleVariableChange(index, 'name', e.target.value)
                          }
                          className="w-full px-2 py-1 text-sm border rounded focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-600 dark:border-gray-500"
                          placeholder={
                            language === 'id' ? 'Nama variabel' : 'Variable name'
                          }
                          required
                        />
                      </div>
                      <div className="md:col-span-4">
                        <input
                          type="text"
                          value={variable.label}
                          onChange={(e) =>
                            handleVariableChange(index, 'label', e.target.value)
                          }
                          className="w-full px-2 py-1 text-sm border rounded focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-600 dark:border-gray-500"
                          placeholder={
                            language === 'id' ? 'Label variabel' : 'Variable label'
                          }
                        />
                      </div>
                      <div className="md:col-span-3">
                        <select
                          value={variable.type}
                          onChange={(e) =>
                            handleVariableChange(index, 'type', e.target.value)
                          }
                          className="w-full px-2 py-1 text-sm border rounded focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-600 dark:border-gray-500"
                        >
                          <option value="number">
                            {language === 'id' ? 'Angka' : 'Number'}
                          </option>
                          <option value="text">
                            {language === 'id' ? 'Teks' : 'Text'}
                          </option>
                        </select>
                      </div>
                      <div className="md:col-span-1">
                        <button
                          type="button"
                          onClick={() => handleRemoveVariable(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setCurrentCalculator({
                    id: null,
                    name: '',
                    description: '',
                    formula: '',
                    variables: [],
                    resultLabel: '',
                  });
                  setIsEditing(false);
                }}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                {language === 'id' ? 'Batal' : 'Cancel'}
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
              >
                {isEditing
                  ? language === 'id'
                    ? 'Perbarui Kalkulator'
                    : 'Update Calculator'
                  : language === 'id'
                  ? 'Buat Kalkulator'
                  : 'Create Calculator'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          {language === 'id' ? 'Kalkulator Kustom Saya' : 'My Custom Calculators'}
        </h3>

        {calculators.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-gray-800 border rounded-lg shadow-sm">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
              {language === 'id' ? 'Belum ada kalkulator' : 'No calculators yet'}
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {language === 'id'
                ? 'Buat kalkulator kustom pertama Anda untuk memulai.'
                : 'Create your first custom calculator to get started.'}
            </p>
            <div className="mt-6">
              <button
                onClick={() => setShowForm(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <svg
                  className="-ml-1 mr-2 h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                {language === 'id'
                  ? 'Buat Kalkulator Kustom'
                  : 'Create Custom Calculator'}
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {calculators.map((calculator) => (
              <div
                key={calculator.id}
                className="bg-white dark:bg-gray-800 border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">
                      {calculator.name}
                    </h4>
                    {calculator.description && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {calculator.description}
                      </p>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleShare(calculator)}
                      className="text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400"
                      title={language === 'id' ? 'Bagikan' : 'Share'}
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleEdit(calculator)}
                      className="text-gray-500 hover:text-yellow-500 dark:text-gray-400 dark:hover:text-yellow-400"
                      title={language === 'id' ? 'Edit' : 'Edit'}
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(calculator.id)}
                      className="text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
                      title={language === 'id' ? 'Hapus' : 'Delete'}
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="mt-3">
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {language === 'id' ? 'Formula' : 'Formula'}:
                  </div>
                  <div className="font-mono text-sm bg-gray-100 dark:bg-gray-700 p-2 rounded mt-1">
                    {calculator.formula}
                  </div>
                </div>

                {calculator.variables.length > 0 && (
                  <div className="mt-3">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {language === 'id' ? 'Variabel' : 'Variables'}:
                    </div>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {calculator.variables.map((variable, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200"
                        >
                          {variable.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                  {language === 'id' ? 'Dibuat pada' : 'Created on'}{' '}
                  {new Date(calculator.createdAt).toLocaleDateString(
                    language === 'id' ? 'id-ID' : 'en-US'
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}