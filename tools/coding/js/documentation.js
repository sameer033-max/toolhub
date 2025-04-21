document.addEventListener('DOMContentLoaded', function() {
    // Sample code snippets
    const sampleCode = {
        'js-function': `function calculateDiscount(price, discountPercent) {
  // Calculate the discount amount
  const discountAmount = price * (discountPercent / 100);
  
  // Calculate the final price
  const finalPrice = price - discountAmount;
  
  // Return both the final price and the discount amount
  return {
    finalPrice: finalPrice,
    discountAmount: discountAmount
  };
}

// Example usage
const result = calculateDiscount(100, 20);
console.log(result.finalPrice); // 80
console.log(result.discountAmount); // 20`,
        'js-class': `class ShoppingCart {
  constructor() {
    this.items = [];
    this.total = 0;
  }
  
  addItem(item) {
    this.items.push(item);
    this.total += item.price;
    return this.items.length;
  }
  
  removeItem(index) {
    if (index >= 0 && index < this.items.length) {
      const item = this.items[index];
      this.total -= item.price;
      this.items.splice(index, 1);
      return true;
    }
    return false;
  }
  
  getTotal() {
    return this.total;
  }
  
  getItems() {
    return [...this.items];
  }
  
  clearCart() {
    this.items = [];
    this.total = 0;
  }
}

// Example usage
const cart = new ShoppingCart();
cart.addItem({ name: 'Product 1', price: 25 });
cart.addItem({ name: 'Product 2', price: 30 });
console.log(cart.getTotal()); // 55`,
        'python-function': `def analyze_data(data, metrics=None, filter_outliers=False):
    """
    This function needs proper documentation
    """
    if metrics is None:
        metrics = ['mean', 'median', 'std']
    
    results = {}
    
    # Filter outliers if requested
    if filter_outliers:
        # Simple outlier removal using IQR
        q1 = np.percentile(data, 25)
        q3 = np.percentile(data, 75)
        iqr = q3 - q1
        lower_bound = q1 - (1.5 * iqr)
        upper_bound = q3 + (1.5 * iqr)
        data = [x for x in data if lower_bound <= x <= upper_bound]
    
    # Calculate requested metrics
    for metric in metrics:
        if metric == 'mean':
            results['mean'] = sum(data) / len(data)
        elif metric == 'median':
            sorted_data = sorted(data)
            mid = len(sorted_data) // 2
            if len(sorted_data) % 2 == 0:
                results['median'] = (sorted_data[mid-1] + sorted_data[mid]) / 2
            else:
                results['median'] = sorted_data[mid]
        elif metric == 'std':
            mean = sum(data) / len(data)
            variance = sum((x - mean) ** 2 for x in data) / len(data)
            results['std'] = variance ** 0.5
    
    return results`
    };

    // Initialize CodeMirror for the code editor
    const codeEditor = CodeMirror(document.getElementById('code-editor'), {
        mode: 'javascript',
        theme: 'dracula',
        lineNumbers: true,
        indentUnit: 4,
        autoCloseBrackets: true,
        matchBrackets: true,
        lineWrapping: true,
        value: '// Paste your code here or select a sample from the right panel\n'
    });

    // Initialize CodeMirror for the docs editor
    const docsEditor = CodeMirror(document.getElementById('docs-editor'), {
        mode: 'javascript',
        theme: 'dracula',
        lineNumbers: true,
        indentUnit: 4,
        autoCloseBrackets: true,
        matchBrackets: true,
        lineWrapping: true,
        readOnly: true,
        value: '// Generated documentation will appear here\n'
    });

    // Language selector change event
    document.getElementById('language-select').addEventListener('change', function(e) {
        const language = e.target.value;
        codeEditor.setOption('mode', language);
        docsEditor.setOption('mode', language);
        
        // Update doc style options based on language
        const docStyleSelect = document.getElementById('doc-style');
        docStyleSelect.innerHTML = '';
        
        if (language === 'javascript') {
            docStyleSelect.innerHTML = `
                <option value="jsdoc">JSDoc</option>
                <option value="markdown">Markdown</option>
            `;
        } else if (language === 'python') {
            docStyleSelect.innerHTML = `
                <option value="docstring">Python Docstrings</option>
                <option value="numpy">NumPy Style</option>
                <option value="google">Google Style</option>
                <option value="markdown">Markdown</option>
            `;
        } else if (language === 'java') {
            docStyleSelect.innerHTML = `
                <option value="javadoc">JavaDoc</option>
                <option value="markdown">Markdown</option>
            `;
        } else if (language === 'csharp') {
            docStyleSelect.innerHTML = `
                <option value="xml">XML Comments</option>
                <option value="markdown">Markdown</option>
            `;
        } else {
            docStyleSelect.innerHTML = `
                <option value="standard">Standard Comments</option>
                <option value="markdown">Markdown</option>
            `;
        }
    });

    // Generate docs button click event
    document.getElementById('generate-docs-btn').addEventListener('click', function() {
        const code = codeEditor.getValue();
        const language = document.getElementById('language-select').value;
        const docStyle = document.getElementById('doc-style').value;
        
        if (!code || code === '// Paste your code here or select a sample from the right panel\n') {
            alert('Please enter some code to document.');
            return;
        }

        // Simulate loading
        this.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Generating...';
        this.disabled = true;

        // Simulate API call with timeout
        setTimeout(() => {
            // Show results
            document.getElementById('generated-docs-card').style.display = 'block';
            document.getElementById('docs-preview-card').style.display = 'block';
            
            let generatedDocs = '';
            let docsPreview = '';
            
            // Generate documentation based on code, language, and doc style
            if (code.includes('calculateDiscount')) {
                if (docStyle === 'jsdoc') {
                    generatedDocs = `/**
 * Calculates the discount for a given price and discount percentage
 *
 * @param {number} price - The original price of the item
 * @param {number} discountPercent - The discount percentage (0-100)
 * @returns {Object} An object containing the final price and discount amount
 * @returns {number} returns.finalPrice - The price after applying the discount
 * @returns {number} returns.discountAmount - The amount that was discounted
 *
 * @example
 * // Calculate a 20% discount on $100
 * const result = calculateDiscount(100, 20);
 * console.log(result.finalPrice); // 80
 * console.log(result.discountAmount); // 20
 */
function calculateDiscount(price, discountPercent) {
  // Calculate the discount amount
  const discountAmount = price * (discountPercent / 100);
  
  // Calculate the final price
  const finalPrice = price - discountAmount;
  
  // Return both the final price and the discount amount
  return {
    finalPrice: finalPrice,
    discountAmount: discountAmount
  };
}`;
                    docsPreview = `<h3>calculateDiscount(price, discountPercent)</h3>
                    <p>Calculates the discount for a given price and discount percentage</p>
                    
                    <h4>Parameters:</h4>
                    <ul>
                        <li><strong>price</strong> <code>number</code> - The original price of the item</li>
                        <li><strong>discountPercent</strong> <code>number</code> - The discount percentage (0-100)</li>
                    </ul>
                    
                    <h4>Returns:</h4>
                    <p><code>Object</code> - An object containing the final price and discount amount</p>
                    <ul>
                        <li><strong>finalPrice</strong> <code>number</code> - The price after applying the discount</li>
                        <li><strong>discountAmount</strong> <code>number</code> - The amount that was discounted</li>
                    </ul>
                    
                    <h4>Example:</h4>
                    <pre><code>// Calculate a 20% discount on $100
const result = calculateDiscount(100, 20);
console.log(result.finalPrice); // 80
console.log(result.discountAmount); // 20</code></pre>`;
                }
            } else if (code.includes('ShoppingCart')) {
                if (docStyle === 'jsdoc') {
                    generatedDocs = `/**
 * Class representing a shopping cart
 * @class
 */
class ShoppingCart {
  /**
   * Create a new shopping cart
   * @constructor
   */
  constructor() {
    /**
     * Array of items in the cart
     * @type {Array}
     * @private
     */
    this.items = [];
    
    /**
     * Total price of all items in the cart
     * @type {number}
     * @private
     */
    this.total = 0;
  }
  
  /**
   * Add an item to the cart
   * @param {Object} item - The item to add
   * @param {string} item.name - The name of the item
   * @param {number} item.price - The price of the item
   * @returns {number} The new number of items in the cart
   */
  addItem(item) {
    this.items.push(item);
    this.total += item.price;
    return this.items.length;
  }
  
  /**
   * Remove an item from the cart
   * @param {number} index - The index of the item to remove
   * @returns {boolean} True if the item was removed, false if the index was invalid
   */
  removeItem(index) {
    if (index >= 0 && index < this.items.length) {
      const item = this.items[index];
      this.total -= item.price;
      this.items.splice(index, 1);
      return true;
    }
    return false;
  }
  
  /**
   * Get the total price of all items in the cart
   * @returns {number} The total price
   */
  getTotal() {
    return this.total;
  }
  
  /**
   * Get all items in the cart
   * @returns {Array} A copy of the items array
   */
  getItems() {
    return [...this.items];
  }
  
  /**
   * Clear all items from the cart
   * @returns {void}
   */
  clearCart() {
    this.items = [];
    this.total = 0;
  }
}`;
                    docsPreview = `<h3>ShoppingCart</h3>
                    <p>Class representing a shopping cart</p>
                    
                    <h4>Constructor:</h4>
                    <p>Creates a new shopping cart with an empty items array and zero total</p>
                    
                    <h4>Methods:</h4>
                    <ul>
                        <li>
                            <strong>addItem(item)</strong>
                            <p>Adds an item to the cart</p>
                            <p><em>Parameters:</em> <code>item</code> - The item to add with name and price properties</p>
                            <p><em>Returns:</em> <code>number</code> - The new number of items in the cart</p>
                        </li>
                        <li>
                            <strong>removeItem(index)</strong>
                            <p>Removes an item from the cart</p>
                            <p><em>Parameters:</em> <code>index</code> - The index of the item to remove</p>
                            <p><em>Returns:</em> <code>boolean</code> - True if the item was removed, false if the index was invalid</p>
                        </li>
                        <li>
                            <strong>getTotal()</strong>
                            <p>Gets the total price of all items in the cart</p>
                            <p><em>Returns:</em> <code>number</code> - The total price</p>
                        </li>
                        <li>
                            <strong>getItems()</strong>
                            <p>Gets all items in the cart</p>
                            <p><em>Returns:</em> <code>Array</code> - A copy of the items array</p>
                        </li>
                        <li>
                            <strong>clearCart()</strong>
                            <p>Clears all items from the cart</p>
                            <p><em>Returns:</em> <code>void</code></p>
                        </li>
                    </ul>`;
                }
            } else if (code.includes('analyze_data')) {
                if (docStyle === 'docstring') {
                    generatedDocs = `def analyze_data(data, metrics=None, filter_outliers=False):
    """
    Analyze a dataset with various statistical metrics.
    
    Parameters
    ----------
    data : list or array-like
        The dataset to analyze
    metrics : list, optional
        List of metrics to calculate. Default is ['mean', 'median', 'std']
    filter_outliers : bool, optional
        Whether to filter outliers before analysis. Default is False
        
    Returns
    -------
    dict
        A dictionary containing the calculated metrics
        
    Examples
    --------
    >>> data = [1, 2, 3, 4, 5, 100]  # 100 is an outlier
    >>> analyze_data(data, metrics=['mean', 'median'], filter_outliers=True)
    {'mean': 3.0, 'median': 3.0}
    
    Notes
    -----
    Outlier detection uses the IQR method with a factor of 1.5.
    """
    if metrics is None:
        metrics = ['mean', 'median', 'std']
    
    results = {}
    
    # Filter outliers if requested
    if filter_outliers:
        # Simple outlier removal using IQR
        q1 = np.percentile(data, 25)
        q3 = np.percentile(data, 75)
        iqr = q3 - q1
        lower_bound = q1 - (1.5 * iqr)
        upper_bound = q3 + (1.5 * iqr)
        data = [x for x in data if lower_bound <= x <= upper_bound]
    
    # Calculate requested metrics
    for metric in metrics:
        if metric == 'mean':
            results['mean'] = sum(data) / len(data)
        elif metric == 'median':
            sorted_data = sorted(data)
            mid = len(sorted_data) // 2
            if len(sorted_data) % 2 == 0:
                results['median'] = (sorted_data[mid-1] + sorted_data[mid]) / 2
            else:
                results['median'] = sorted_data[mid]
        elif metric == 'std':
            mean = sum(data) / len(data)
            variance = sum((x - mean) ** 2 for x in data) / len(data)
            results['std'] = variance ** 0.5
    
    return results`;
                    docsPreview = `<h3>analyze_data(data, metrics=None, filter_outliers=False)</h3>
                    <p>Analyze a dataset with various statistical metrics.</p>
                    
                    <h4>Parameters:</h4>
                    <ul>
                        <li><strong>data</strong> <code>list or array-like</code> - The dataset to analyze</li>
                        <li><strong>metrics</strong> <code>list, optional</code> - List of metrics to calculate. Default is ['mean', 'median', 'std']</li>
                        <li><strong>filter_outliers</strong> <code>bool, optional</code> - Whether to filter outliers before analysis. Default is False</li>
                    </ul>
                    
                    <h4>Returns:</h4>
                    <p><code>dict</code> - A dictionary containing the calculated metrics</p>
                    
                    <h4>Examples:</h4>
                    <pre><code>>>> data = [1, 2, 3, 4, 5, 100]  # 100 is an outlier
>>> analyze_data(data, metrics=['mean', 'median'], filter_outliers=True)
{'mean': 3.0, 'median': 3.0}</code></pre>
                    
                    <h4>Notes:</h4>
                    <p>Outlier detection uses the IQR method with a factor of 1.5.</p>`;
                }
            } else {
                // Default documentation for unknown code
                if (language === 'javascript' && docStyle === 'jsdoc') {
                    generatedDocs = `/**
 * This is auto-generated documentation for your code.
 * In a real implementation, our AI would analyze your code structure
 * and generate appropriate documentation.
 *
 * @param {*} params - Parameters for this function
 * @returns {*} Return value description
 */
${code}`;
                } else if (language === 'python' && docStyle === 'docstring') {
                    generatedDocs = `def your_function(params):
    """
    This is auto-generated documentation for your code.
    In a real implementation, our AI would analyze your code structure
    and generate appropriate documentation.
    
    Parameters
    ----------
    params : type
        Description of parameters
        
    Returns
    -------
    type
        Description of return value
    """
    # Your code would be here
    pass`;
                } else {
                    generatedDocs = `// This is auto-generated documentation for your code.
// In a real implementation, our AI would analyze your code structure
// and generate appropriate documentation.

${code}`;
                }
                
                docsPreview = `<h3>Auto-Generated Documentation</h3>
                <p>This is a preview of how your documentation would look in a rendered format.</p>
                <p>In a real implementation, our AI would analyze your code structure and generate appropriate documentation with:</p>
                <ul>
                    <li>Function/method descriptions</li>
                    <li>Parameter descriptions with types</li>
                    <li>Return value descriptions</li>
                    <li>Usage examples</li>
                    <li>Notes and warnings where applicable</li>
                </ul>`;
            }
            
            // Set the generated docs in the editor
            docsEditor.setValue(generatedDocs);
            
            // Set the preview
            document.getElementById('docs-preview').innerHTML = docsPreview || '<p>Documentation preview not available for this code.</p>';
            
            // Reset button
            this.innerHTML = '<i class="fas fa-file-alt me-2"></i>Generate Documentation';
            this.disabled = false;
        }, 2000);
    });

    // Sample code buttons
    document.querySelectorAll('[data-sample]').forEach(button => {
        button.addEventListener('click', function() {
            const sampleKey = this.getAttribute('data-sample');
            const language = sampleKey.startsWith('js') ? 'javascript' : 'python';
            
            // Set the language in the dropdown
            document.getElementById('language-select').value = language;
            document.getElementById('language-select').dispatchEvent(new Event('change'));
            
            // Set the sample code
            codeEditor.setValue(sampleCode[sampleKey]);
            
            // Hide results
            document.getElementById('generated-docs-card').style.display = 'none';
            document.getElementById('docs-preview-card').style.display = 'none';
        });
    });

    // Copy docs button
    document.getElementById('copy-docs-btn').addEventListener('click', function() {
        const docs = docsEditor.getValue();
        navigator.clipboard.writeText(docs).then(() => {
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-check me-1"></i>Copied!';
            setTimeout(() => {
                this.innerHTML = originalText;
            }, 2000);
        });
    });

    // Download docs button
    document.getElementById('download-docs-btn').addEventListener('click', function() {
        const docs = docsEditor.getValue();
        const language = document.getElementById('language-select').value;
        let extension = '.txt';
        
        // Set appropriate file extension
        switch(language) {
            case 'javascript': extension = '.js'; break;
            case 'python': extension = '.py'; break;
            case 'java': extension = '.java'; break;
            case 'csharp': extension = '.cs'; break;
            case 'php': extension = '.php'; break;
        }
        
        const blob = new Blob([docs], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `documentation${extension}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });
});
