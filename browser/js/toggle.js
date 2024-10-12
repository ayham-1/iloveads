document.addEventListener('DOMContentLoaded', function() {
    const checkbox = document.getElementById('toggle');

    // Load the saved state from storage when the popup loads
    browser.storage.local.get('checkboxState', function(result) {
        checkbox.checked = result.checkboxState || false; // default to unchecked if not found
    });

    // Listen for checkbox changes and save the state
    checkbox.addEventListener('change', function() {
        browser.storage.local.set({ checkboxState: checkbox.checked }, function() {
            console.log("Checkbox state saved:", checkbox.checked);
        });
    });
});
