const topicData = {
  "Arrays & Strings": [
    {
      badge: "Easy", badgeClass: "",
      title: "Two Pointers",
      desc: "Used in sorted arrays and pair finding problems.",
      code: `void twoPointers(vector<int>& arr) {

    int l = 0;
    int r = arr.size() - 1;

    while (l < r) {

        if (condition_met(arr[l], arr[r])) {
            l++;
            r--;
        }
        else if (need_larger) {
            l++;
        }
        else {
            r--;
        }
    }
}`
    },
    {
      badge: "Medium", badgeClass: "medium",
      title: "Sliding Window",
      desc: "Used in substring and subarray problems.",
      code: `int slidingWindow(string s) {

    int l = 0;
    int best = 0;

    unordered_map<char,int> freq;

    for (int r = 0; r < s.size(); r++) {

        freq[s[r]]++;

        while (window_invalid(freq)) {

            freq[s[l]]--;

            if (freq[s[l]] == 0)
                freq.erase(s[l]);

            l++;
        }

        best = max(best, r - l + 1);
    }

    return best;
}`
    }
  ],

  "Binary Search": [
    {
      badge: "Easy", badgeClass: "",
      title: "Classic Binary Search",
      desc: "Find a target in a sorted array in O(log n).",
      code: `int binarySearch(vector<int>& arr, int target) {

    int l = 0;
    int r = arr.size() - 1;

    while (l <= r) {

        int mid = l + (r - l) / 2;

        if (arr[mid] == target)
            return mid;
        else if (arr[mid] < target)
            l = mid + 1;
        else
            r = mid - 1;
    }

    return -1;
}`
    },
    {
      badge: "Medium", badgeClass: "medium",
      title: "Search in Rotated Array",
      desc: "Binary search on a rotated sorted array.",
      code: `int searchRotated(vector<int>& arr, int target) {

    int l = 0, r = arr.size() - 1;

    while (l <= r) {

        int mid = l + (r - l) / 2;

        if (arr[mid] == target) return mid;

        if (arr[l] <= arr[mid]) {
            if (arr[l] <= target && target < arr[mid])
                r = mid - 1;
            else
                l = mid + 1;
        } else {
            if (arr[mid] < target && target <= arr[r])
                l = mid + 1;
            else
                r = mid - 1;
        }
    }

    return -1;
}`
    }
  ],

  "Linked List": [
    {
      badge: "Easy", badgeClass: "",
      title: "Reverse a Linked List",
      desc: "Iteratively reverse a singly linked list.",
      code: `ListNode* reverse(ListNode* head) {

    ListNode* prev = nullptr;
    ListNode* curr = head;

    while (curr) {

        ListNode* next = curr->next;
        curr->next = prev;
        prev = curr;
        curr = next;
    }

    return prev;
}`
    },
    {
      badge: "Medium", badgeClass: "medium",
      title: "Detect Cycle (Floyd's)",
      desc: "Detect a cycle using slow and fast pointers.",
      code: `bool hasCycle(ListNode* head) {

    ListNode* slow = head;
    ListNode* fast = head;

    while (fast && fast->next) {

        slow = slow->next;
        fast = fast->next->next;

        if (slow == fast)
            return true;
    }

    return false;
}`
    }
  ],

  "Trees": [
    {
      badge: "Easy", badgeClass: "",
      title: "Inorder Traversal",
      desc: "Left → Root → Right traversal of a binary tree.",
      code: `void inorder(TreeNode* root, vector<int>& res) {

    if (!root) return;

    inorder(root->left, res);
    res.push_back(root->val);
    inorder(root->right, res);
}`
    },
    {
      badge: "Medium", badgeClass: "medium",
      title: "Level Order (BFS)",
      desc: "Traverse a tree level by level using a queue.",
      code: `vector<vector<int>> levelOrder(TreeNode* root) {

    vector<vector<int>> res;
    if (!root) return res;

    queue<TreeNode*> q;
    q.push(root);

    while (!q.empty()) {

        int sz = q.size();
        vector<int> level;

        for (int i = 0; i < sz; i++) {
            TreeNode* node = q.front(); q.pop();
            level.push_back(node->val);
            if (node->left)  q.push(node->left);
            if (node->right) q.push(node->right);
        }

        res.push_back(level);
    }

    return res;
}`
    }
  ],

  "Graphs": [
    {
      badge: "Medium", badgeClass: "medium",
      title: "BFS",
      desc: "Breadth-first search for shortest path problems.",
      code: `void bfs(int start, vector<vector<int>>& adj, int n) {

    vector<bool> visited(n, false);
    queue<int> q;

    visited[start] = true;
    q.push(start);

    while (!q.empty()) {

        int node = q.front(); q.pop();
        cout << node << " ";

        for (int neighbor : adj[node]) {
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                q.push(neighbor);
            }
        }
    }
}`
    },
    {
      badge: "Medium", badgeClass: "medium",
      title: "DFS",
      desc: "Depth-first search for cycle detection and connectivity.",
      code: `void dfs(int node, vector<vector<int>>& adj,
         vector<bool>& visited) {

    visited[node] = true;
    cout << node << " ";

    for (int neighbor : adj[node]) {
        if (!visited[neighbor])
            dfs(neighbor, adj, visited);
    }
}`
    }
  ],

  "Dynamic Programming": [
    {
      badge: "Medium", badgeClass: "medium",
      title: "0/1 Knapsack",
      desc: "Classic DP: maximize value within a weight limit.",
      code: `int knapsack(int W, vector<int>& wt,
             vector<int>& val, int n) {

    vector<vector<int>> dp(n+1, vector<int>(W+1, 0));

    for (int i = 1; i <= n; i++) {
        for (int w = 0; w <= W; w++) {

            dp[i][w] = dp[i-1][w];

            if (wt[i-1] <= w)
                dp[i][w] = max(dp[i][w],
                    dp[i-1][w-wt[i-1]] + val[i-1]);
        }
    }

    return dp[n][W];
}`
    },
    {
      badge: "Hard", badgeClass: "hard",
      title: "Longest Common Subsequence",
      desc: "Find the longest subsequence common to two strings.",
      code: `int lcs(string& a, string& b) {

    int m = a.size(), n = b.size();
    vector<vector<int>> dp(m+1, vector<int>(n+1, 0));

    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {

            if (a[i-1] == b[j-1])
                dp[i][j] = dp[i-1][j-1] + 1;
            else
                dp[i][j] = max(dp[i-1][j], dp[i][j-1]);
        }
    }

    return dp[m][n];
}`
    }
  ]
};

function renderCards(topicName) {
  const content = document.querySelector('.content');
  const cards = topicData[topicName];

  if (!cards) {
    content.innerHTML = `<p style="color:#9ca3af">No content yet for this topic.</p>`;
    return;
  }

  content.innerHTML = cards.map(card => `
    <div class="card">
      <div class="header">
        <span class="badge ${card.badgeClass}">${card.badge}</span>
        <h2>${card.title}</h2>
      </div>
      <p class="desc">${card.desc}</p>
      <pre><code>${escapeHtml(card.code)}</code></pre>
    </div>
  `).join('');
}

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// Sidebar click handling
const topics = document.querySelectorAll('.topic');

topics.forEach(topic => {
  topic.addEventListener('click', () => {

    topics.forEach(t => t.classList.remove('active'));
    topic.classList.add('active');

    renderCards(topic.textContent.trim());
  });
});

// Load default topic on page start
renderCards('Arrays & Strings');

console.log('DSA Vault Loaded');
