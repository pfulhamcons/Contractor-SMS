const { useState } = React;
const { FileText, CheckCircle, AlertTriangle, UserCheck } = lucide;

function ContractorSafetySystem() {
  const [activeTab, setActiveTab] = useState('signin');
  const [signInData, setSignInData] = useState({
    name: '',
    company: '',
    purpose: '',
    date: new Date().toISOString().split('T')[0]
  });
  const [agreementSigned, setAgreementSigned] = useState(false);
  const [signature, setSignature] = useState('');
  const [visitors, setVisitors] = useState([]);

  const documents = [
    { name: 'Safety Guidelines 2024', file: 'documents/safety-guidelines.pdf', category: 'Safety' },
    { name: 'Emergency Procedures', file: 'documents/emergency-procedures.pdf', category: 'Emergency' },
    { name: 'PPE Requirements', file: 'documents/ppe-requirements.pdf', category: 'Safety' },
    { name: 'Contractor Handbook', file: 'documents/contractor-handbook.pdf', category: 'General' }
  ];

  const handleSignIn = () => {
    if (!agreementSigned) {
      alert('Please sign the safety agreement before checking in.');
      setActiveTab('agreement');
      return;
    }
    
    if (!signInData.name || !signInData.company || !signInData.purpose) {
      alert('Please fill in all required fields');
      return;
    }
    
    const newVisitor = {
      ...signInData,
      checkInTime: new Date().toLocaleTimeString(),
      id: Date.now()
    };
    
    setVisitors([newVisitor, ...visitors]);
    
    alert(`Check-in successful!\n\nNotification sent to safety coordinator:\n${signInData.name} from ${signInData.company} has arrived.`);
    
    setSignInData({
      name: '',
      company: '',
      purpose: '',
      date: new Date().toISOString().split('T')[0]
    });
    setAgreementSigned(false);
    setSignature('');
  };

  const handleAgreementSign = () => {
    if (signature.trim().length < 3) {
      alert('Please enter your full name as signature');
      return;
    }
    setAgreementSigned(true);
    alert('Agreement signed successfully! You can now check in.');
    setActiveTab('signin');
  };

  const handleDownload = (file) => {
    window.open(file, '_blank');
  };

  return React.createElement('div', { className: "min-h-screen bg-gray-50" },
    React.createElement('div', { className: "bg-blue-900 text-white py-6 px-4 shadow-lg" },
      React.createElement('div', { className: "max-w-6xl mx-auto" },
        React.createElement('h1', { className: "text-3xl font-bold" }, 'Manufacturing Plant'),
        React.createElement('p', { className: "text-blue-200 mt-1" }, 'Contractor Safety Management System')
      )
    ),
    React.createElement('div', { className: "bg-white shadow" },
      React.createElement('div', { className: "max-w-6xl mx-auto px-4" },
        React.createElement('div', { className: "flex space-x-1" },
          React.createElement('button', {
            onClick: () => setActiveTab('signin'),
            className: `px-6 py-4 font-medium transition-colors ${activeTab === 'signin' ? 'text-blue-900 border-b-2 border-blue-900' : 'text-gray-600 hover:text-gray-900'}`
          },
            React.createElement(UserCheck, { className: "inline w-5 h-5 mr-2" }),
            'Check In'
          ),
          React.createElement('button', {
            onClick: () => setActiveTab('agreement'),
            className: `px-6 py-4 font-medium transition-colors ${activeTab === 'agreement' ? 'text-blue-900 border-b-2 border-blue-900' : 'text-gray-600 hover:text-gray-900'}`
          },
            React.createElement(CheckCircle, { className: "inline w-5 h-5 mr-2" }),
            'Safety Agreement'
          ),
          React.createElement('button', {
            onClick: () => setActiveTab('documents'),
            className: `px-6 py-4 font-medium transition-colors ${activeTab === 'documents' ? 'text-blue-900 border-b-2 border-blue-900' : 'text-gray-600 hover:text-gray-900'}`
          },
            React.createElement(FileText, { className: "inline w-5 h-5 mr-2" }),
            'Documents'
          ),
          React.createElement('button', {
            onClick: () => setActiveTab('visitors'),
            className: `px-6 py-4 font-medium transition-colors ${activeTab === 'visitors' ? 'text-blue-900 border-b-2 border-blue-900' : 'text-gray-600 hover:text-gray-900'}`
          },
            'Current Visitors'
          )
        )
      )
    ),
    React.createElement('div', { className: "max-w-6xl mx-auto px-4 py-8" },
      activeTab === 'signin' && React.createElement('div', { className: "bg-white rounded-lg shadow-md p-6" },
        React.createElement('h2', { className: "text-2xl font-bold text-gray-900 mb-6" }, 'Contractor Check-In'),
        agreementSigned ? 
          React.createElement('div', { className: "bg-green-50 border border-green-200 rounded p-4 mb-6" },
            React.createElement(CheckCircle, { className: "inline w-5 h-5 text-green-600 mr-2" }),
            React.createElement('span', { className: "text-green-800 font-medium" }, 'Safety agreement signed')
          ) :
          React.createElement('div', { className: "bg-yellow-50 border border-yellow-200 rounded p-4 mb-6" },
            React.createElement(AlertTriangle, { className: "inline w-5 h-5 text-yellow-600 mr-2" }),
            React.createElement('span', { className: "text-yellow-800" }, 'You must sign the safety agreement before checking in')
          ),
        React.createElement('div', { className: "space-y-4" },
          React.createElement('div', null,
            React.createElement('label', { className: "block text-sm font-medium text-gray-700 mb-2" }, 'Full Name *'),
            React.createElement('input', {
              type: "text",
              value: signInData.name,
              onChange: (e) => setSignInData({...signInData, name: e.target.value}),
              className: "w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            })
          ),
          React.createElement('div', null,
            React.createElement('label', { className: "block text-sm font-medium text-gray-700 mb-2" }, 'Company Name *'),
            React.createElement('input', {
              type: "text",
              value: signInData.company,
              onChange: (e) => setSignInData({...signInData, company: e.target.value}),
              className: "w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            })
          ),
          React.createElement('div', null,
            React.createElement('label', { className: "block text-sm font-medium text-gray-700 mb-2" }, 'Purpose of Visit *'),
            React.createElement('textarea', {
              value: signInData.purpose,
              onChange: (e) => setSignInData({...signInData, purpose: e.target.value}),
              rows: "3",
              className: "w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            })
          ),
          React.createElement('div', null,
            React.createElement('label', { className: "block text-sm font-medium text-gray-700 mb-2" }, 'Date'),
            React.createElement('input', {
              type: "date",
              value: signInData.date,
              onChange: (e) => setSignInData({...signInData, date: e.target.value}),
              className: "w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            })
          ),
          React.createElement('button', {
            onClick: handleSignIn,
            className: "w-full bg-blue-900 text-white py-3 rounded-lg font-medium hover:bg-blue-800 transition-colors"
          }, 'Check In')
        )
      ),
      activeTab === 'agreement' && React.createElement('div', { className: "bg-white rounded-lg shadow-md p-6" },
        React.createElement('h2', { className: "text-2xl font-bold text-gray-900 mb-6" }, 'Contractor Safety Agreement'),
        React.createElement('div', { className: "bg-gray-50 border border-gray-200 rounded p-6 mb-6 max-h-96 overflow-y-auto" },
          React.createElement('h3', { className: "font-bold text-lg mb-4" }, 'Safety Rules and Regulations'),
          React.createElement('div', { className: "space-y-4 text-sm text-gray-700" },
            React.createElement('p', { className: "font-medium" }, 'By signing this agreement, I acknowledge and agree to:'),
            React.createElement('ol', { className: "list-decimal list-inside space-y-2 ml-4" },
              React.createElement('li', null, 'Comply with all safety rules and regulations of the facility'),
              React.createElement('li', null, 'Wear appropriate Personal Protective Equipment (PPE) at all times'),
              React.createElement('li', null, 'Report any unsafe conditions or incidents immediately'),
              React.createElement('li', null, 'Follow all posted safety signs and warnings'),
              React.createElement('li', null, 'Not operate any equipment without proper authorization'),
              React.createElement('li', null, 'Attend all required safety briefings'),
              React.createElement('li', null, 'Follow emergency evacuation procedures if required'),
              React.createElement('li', null, 'Maintain a clean and safe work area'),
              React.createElement('li', null, 'Not use drugs or alcohol on facility premises'),
              React.createElement('li', null, 'Follow all environmental and waste disposal procedures')
            ),
            React.createElement('p', { className: "font-medium mt-6" }, 'I understand that:'),
            React.createElement('ul', { className: "list-disc list-inside space-y-2 ml-4" },
              React.createElement('li', null, 'Failure to comply may result in removal from the facility'),
              React.createElement('li', null, 'I am responsible for my own safety and the safety of others'),
              React.createElement('li', null, 'I must report any injuries or near-misses immediately')
            )
          )
        ),
        agreementSigned ? 
          React.createElement('div', { className: "bg-green-50 border border-green-200 rounded p-6 text-center" },
            React.createElement(CheckCircle, { className: "inline w-12 h-12 text-green-600 mb-2" }),
            React.createElement('p', { className: "text-green-800 font-medium text-lg" }, 'Agreement Signed'),
            React.createElement('p', { className: "text-green-700 text-sm mt-2" }, `Signed by: ${signature}`)
          ) :
          React.createElement('div', { className: "space-y-4" },
            React.createElement('div', null,
              React.createElement('label', { className: "block text-sm font-medium text-gray-700 mb-2" }, 'Type your full name to sign *'),
              React.createElement('input', {
                type: "text",
                value: signature,
                onChange: (e) => setSignature(e.target.value),
                placeholder: "Enter your full name",
                className: "w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              }),
              React.createElement('p', { className: "text-xs text-gray-500 mt-1" }, 'This constitutes your electronic signature')
            ),
            React.createElement('button', {
              onClick: handleAgreementSign,
              className: "w-full bg-blue-900 text-white py-3 rounded-lg font-medium hover:bg-blue-800 transition-colors"
            }, 'Sign Agreement')
          )
      ),
      activeTab === 'documents' && React.createElement('div', { className: "bg-white rounded-lg shadow-md p-6" },
        React.createElement('h2', { className: "text-2xl font-bold text-gray-900 mb-6" }, 'Safety Documents'),
        React.createElement('div', { className: "grid gap-4" },
          documents.map((doc, idx) =>
            React.createElement('div', { key: idx, className: "flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors" },
              React.createElement('div', { className: "flex items-center" },
                React.createElement(FileText, { className: "w-8 h-8 text-blue-900 mr-4" }),
                React.createElement('div', null,
                  React.createElement('h3', { className: "font-medium text-gray-900" }, doc.name),
                  React.createElement('p', { className: "text-sm text-gray-500" }, doc.category)
                )
              ),
              React.createElement('button', {
                onClick: () => handleDownload(doc.file),
                className: "px-4 py-2 bg-blue-900 text-white rounded hover:bg-blue-800 transition-colors"
              }, 'Download PDF')
            )
          )
        ),
        React.createElement('div', { className: "mt-6 p-4 bg-blue-50 border border-blue-200 rounded" },
          React.createElement('p', { className: "text-sm text-blue-800" },
            React.createElement('strong', null, 'Note: '),
            'Upload your PDF files to the "documents" folder in your repository.'
          )
        )
      ),
      activeTab === 'visitors' && React.createElement('div', { className: "bg-white rounded-lg shadow-md p-6" },
        React.createElement('h2', { className: "text-2xl font-bold text-gray-900 mb-6" }, 'Current Visitors'),
        visitors.length === 0 ?
          React.createElement('div', { className: "text-center py-12 text-gray-500" },
            React.createElement(UserCheck, { className: "w-16 h-16 mx-auto mb-4 text-gray-300" }),
            React.createElement('p', null, 'No contractors currently checked in')
          ) :
          React.createElement('div', { className: "space-y-4" },
            visitors.map((visitor) =>
              React.createElement('div', { key: visitor.id, className: "p-4 border border-gray-200 rounded-lg" },
                React.createElement('div', { className: "flex justify-between items-start" },
                  React.createElement('div', null,
                    React.createElement('h3', { className: "font-medium text-gray-900" }, visitor.name),
                    React.createElement('p', { className: "text-sm text-gray-600" }, visitor.company),
                    React.createElement('p', { className: "text-sm text-gray-500 mt-1" }, visitor.purpose)
                  ),
                  React.createElement('div', { className: "text-right" },
                    React.createElement('p', { className: "text-sm font-medium text-gray-900" }, visitor.checkInTime),
                    React.createElement('p', { className: "text-sm text-gray-500" }, visitor.date)
                  )
                )
              )
            )
          )
      )
    )
  );
}

ReactDOM.render(React.createElement(ContractorSafetySystem), document.getElementById('root'));
