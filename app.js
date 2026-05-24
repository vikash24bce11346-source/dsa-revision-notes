// ============================================================
//  DSA FAANG Revision Notes — app.js
// ============================================================

const topics = [
  {
    id: "arrays",
    icon: "⊞",
    label: "Arrays & Strings",
    sub: "Foundation of every FAANG interview",
    patterns: [
      {
        name: "Two Pointers",
        diff: "easy",
        when: "Sorted array, finding pairs/triplets, palindrome check, container problems. Use when you need O(1) space and O(n) time on linear data.",
        insight: "Start one pointer at each end (opposite direction) OR both at start moving at different speeds (same direction). Shrink the window based on a condition.",
        template: `void twoPointers(const vector<int>& arr) {
    int l = 0;
    int r = arr.size() - 1;
    while (l < r) {
        if (conditionMet(arr[l], arr[r])) {
            // process answer
            l++; r--;
        } else if (needLarger) {
            l++;
        } else {
            r--;
        }
    }
}`,
        tc: ["Time: O(n)", "Space: O(1)"],
        problems: ["Two Sum II", "3Sum", "Container With Most Water", "Valid Palindrome", "Trapping Rain Water"]
      },
      {
        name: "Sliding Window",
        diff: "medium",
        when: "Subarray/substring with constraint (max, min, exactly k). Fixed or variable window size. Contiguous elements required.",
        insight: "Expand right always. Shrink left when window violates constraint. Track state with a hashmap or counter. Never reset — slide!",
        template: `int slidingWindow(const string& s) {
    int l = 0, best = 0;
    unordered_map<char, int> state;
    for (int r = 0; r < s.length(); r++) {
        state[s[r]]++;
        while (windowInvalid(state)) {
            state[s[l]]--;
            if (state[s[l]] == 0) {
                state.erase(s[l]);
            }
            l++;
        }
        best = max(best, r - l + 1);
    }
    return best;
}`,
        tc: ["Time: O(n)", "Space: O(k) where k=window"],
        problems: ["Longest Substring Without Repeating", "Minimum Window Substring", "Fruit Into Baskets", "Longest Repeating Char Replacement", "Permutation in String"]
      },
      {
        name: "Prefix Sum",
        diff: "easy",
        when: "Range sum queries, subarray sum equals k, 2D range queries. Pre-process once, answer queries in O(1).",
        insight: "prefix[i] = sum of arr[0..i-1]. Range sum [l,r] = prefix[r+1] - prefix[l]. Combine with hashmap for 'subarray sum = k'.",
        template: `// Subarray sum equals k
int subarraySum(const vector<int>& nums, int k) {
    int count = 0, curr = 0;
    unordered_map<int, int> seen;
    seen[0] = 1;
    for (int n : nums) {
        curr += n;
        if (seen.count(curr - k)) {
            count += seen[curr - k];
        }
        seen[curr]++;
    }
    return count;
}`,
        tc: ["Time: O(n)", "Space: O(n)"],
        problems: ["Subarray Sum Equals K", "Range Sum Query", "Product of Array Except Self", "Find Pivot Index", "Contiguous Array"]
      }
    ]
  },
  {
    id: "binsearch",
    icon: "⇅",
    label: "Binary Search",
    sub: "When the search space is monotonic",
    patterns: [
      {
        name: "Classic Binary Search",
        diff: "easy",
        when: "Sorted array. Finding an element, first/last occurrence, or insert position.",
        insight: "NEVER use mid=(l+r)/2 (overflow). Use mid=l+(r-l)/2. Three templates: find exact, find leftmost, find rightmost. Know which one to apply.",
        template: `// Find leftmost occurrence
int binarySearch(const vector<int>& nums, int target) {
    int l = 0;
    int r = nums.size() - 1;
    int result = -1;
    while (l <= r) {
        int mid = l + (r - l) / 2;
        if (nums[mid] == target) {
            result = mid;
            r = mid - 1; // keep searching left
        } else if (nums[mid] < target) {
            l = mid + 1;
        } else {
            r = mid - 1;
        }
    }
    return result;
}`,
        tc: ["Time: O(log n)", "Space: O(1)"],
        problems: ["Binary Search", "Search Insert Position", "First and Last Position", "Search in Rotated Array", "Find Minimum in Rotated Array"]
      },
      {
        name: "Binary Search on Answer",
        diff: "hard",
        when: '"Minimize the maximum" or "Maximize the minimum" problems. The answer itself is monotonic — if X works, X+1 also works (or vice versa).',
        insight: "Define a feasibility function is_possible(mid). Binary search on the answer range (not index). This converts hard problems into medium ones.",
        template: `bool isPossible(const vector<int>& nums, int limit, int m) {
    int count = 1, curr = 0;
    for (int n : nums) {
        if (curr + n > limit) {
            count++;
            curr = 0;
        }
        curr += n;
    }
    return count <= m;
}

int solve(const vector<int>& nums, int m) {
    int l = *max_element(nums.begin(), nums.end());
    int r = accumulate(nums.begin(), nums.end(), 0);
    while (l < r) {
        int mid = l + (r - l) / 2;
        if (isPossible(nums, mid, m)) {
            r = mid;
        } else {
            l = mid + 1;
        }
    }
    return l;
}`,
        tc: ["Time: O(n log(sum))", "Space: O(1)"],
        problems: ["Koko Eating Bananas", "Split Array Largest Sum", "Capacity To Ship Packages", "Minimum Days to Make Bouquets", "Find Peak Element"]
      }
    ]
  },
  {
    id: "linkedlist",
    icon: "⬡",
    label: "Linked Lists",
    sub: "Pointer manipulation mastery",
    patterns: [
      {
        name: "Fast & Slow Pointers",
        diff: "medium",
        when: "Cycle detection, middle of list, nth node from end, intersection point.",
        insight: "Slow moves 1 step, fast moves 2 steps. They meet inside a cycle. To find start of cycle: reset one pointer to head, move both 1 step at a time — meeting point is cycle start.",
        template: `ListNode* hasCycle(ListNode* head) {
    ListNode* slow = head;
    ListNode* fast = head;
    while (fast != nullptr && fast->next != nullptr) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) {
            // Find cycle start:
            slow = head;
            while (slow != fast) {
                slow = slow->next;
                fast = fast->next;
            }
            return slow; // cycle start
        }
    }
    return nullptr;
}`,
        tc: ["Time: O(n)", "Space: O(1)"],
        problems: ["Linked List Cycle II", "Middle of Linked List", "Happy Number", "Find Duplicate Number", "Reorder List"]
      },
      {
        name: "Reverse / In-Place",
        diff: "medium",
        when: "Reverse entire list, reverse in groups (k), reverse between indices, palindrome check.",
        insight: "Track prev, curr, next. Update next before moving. For group reversal, recurse or track group boundaries. DRAW IT OUT before coding.",
        template: `ListNode* reverseList(ListNode* head) {
    ListNode* prev = nullptr;
    ListNode* curr = head;
    while (curr != nullptr) {
        ListNode* nxt = curr->next;
        curr->next = prev;
        prev = curr;
        curr = nxt;
    }
    return prev;
}

ListNode* reverseBetween(ListNode* head, int l, int r) {
    ListNode* dummy = new ListNode(0, head);
    ListNode* prev = dummy;
    for (int i = 0; i < l - 1; i++) {
        prev = prev->next;
    }
    ListNode* curr = prev->next;
    for (int i = 0; i < r - l; i++) {
        ListNode* nxt = curr->next;
        curr->next = nxt->next;
        nxt->next = prev->next;
        prev->next = nxt;
    }
    return dummy->next;
}`,
        tc: ["Time: O(n)", "Space: O(1)"],
        problems: ["Reverse Linked List", "Reverse Linked List II", "Reverse Nodes in k-Group", "Palindrome Linked List", "Swap Nodes in Pairs"]
      }
    ]
  },
  {
    id: "trees",
    icon: "⌥",
    label: "Trees & BST",
    sub: "Recursion is the key — trust the stack",
    patterns: [
      {
        name: "DFS (Tree)",
        diff: "easy",
        when: "Any tree traversal, path problems, max/min depth, diameter, LCA, validate BST.",
        insight: "Think: what does this function return to its parent? For path problems, pass accumulator down. For aggregation, return value up. 3 traversals: pre (root first), in (sorted for BST), post (children first).",
        template: `// Generic DFS — returns answer to parent
int dfs(TreeNode* node) {
    if (node == nullptr) return base_case;
    int left = dfs(node->left);
    int right = dfs(node->right);
    // Combine left, right, node->val
    return combined_result;
}

// Path sum (pass down)
int pathSum(TreeNode* node, int target) {
    if (node == nullptr) return 0;
    target -= node->val;
    if (node->left == nullptr && node->right == nullptr) {
        return target == 0 ? 1 : 0;
    }
    return pathSum(node->left, target) + pathSum(node->right, target);
}`,
        tc: ["Time: O(n)", "Space: O(h) where h=height"],
        problems: ["Max Depth", "Diameter of Tree", "LCA of BST", "Path Sum II", "Serialize & Deserialize BST"]
      },
      {
        name: "BFS / Level Order",
        diff: "easy",
        when: "Shortest path in unweighted tree/graph, level-by-level processing, min depth, right side view.",
        insight: "Use a deque. Process level by level using the queue size at the start of each iteration. Always pop from left, append to right.",
        template: `vector<vector<int>> levelOrder(TreeNode* root) {
    if (root == nullptr) return {};
    vector<vector<int>> result;
    queue<TreeNode*> q;
    q.push(root);
    while (!q.empty()) {
        int size = q.size(); // snapshot size
        vector<int> level;
        for (int i = 0; i < size; i++) {
            TreeNode* node = q.front();
            q.pop();
            level.push_back(node->val);
            if (node->left != nullptr) q.push(node->left);
            if (node->right != nullptr) q.push(node->right);
        }
        result.push_back(level);
    }
    return result;
}`,
        tc: ["Time: O(n)", "Space: O(w) where w=max width"],
        problems: ["Level Order Traversal", "Right Side View", "Min Depth", "ZigZag Traversal", "Connect Next Right Pointers"]
      },
      {
        name: "BST Properties",
        diff: "medium",
        when: "Validate BST, kth smallest, range sum, in-order successor, insert/delete.",
        insight: "In-order traversal of BST gives sorted order. For validate: pass (min_bound, max_bound) down — not just compare with parent. kth smallest = in-order traversal counting.",
        template: `// Validate BST
bool isValidBST(TreeNode* root, long long lo = LLONG_MIN, long long hi = LLONG_MAX) {
    if (root == nullptr) return true;
    if (root->val <= lo || root->val >= hi) return false;
    return isValidBST(root->left, lo, root->val) && 
           isValidBST(root->right, root->val, hi);
}

// Kth Smallest — iterative in-order
int kthSmallest(TreeNode* root, int k) {
    stack<TreeNode*> st;
    TreeNode* node = root;
    while (!st.empty() || node != nullptr) {
        while (node != nullptr) {
            st.push(node);
            node = node->left;
        }
        node = st.top();
        st.pop();
        k--;
        if (k == 0) return node->val;
        node = node->right;
    }
    return -1;
}`,
        tc: ["Time: O(n) / O(h)", "Space: O(h)"],
        problems: ["Validate BST", "Kth Smallest in BST", "Lowest Common Ancestor", "Delete Node in BST", "Inorder Successor"]
      }
    ]
  },
  {
    id: "graphs",
    icon: "◈",
    label: "Graphs",
    sub: "BFS for shortest path, DFS for connectivity",
    patterns: [
      {
        name: "Graph BFS — Shortest Path",
        diff: "medium",
        when: "Unweighted shortest path, minimum steps, word ladder, rotting oranges, multi-source BFS.",
        insight: "BFS guarantees shortest path in unweighted graphs. Multi-source: add all sources to queue first. Mark visited BEFORE enqueuing (not after dequeuing) to avoid duplicates.",
        template: `int bfsShortest(const vector<vector<int>>& graph, int start, int end) {
    queue<pair<int, int>> q; // {node, distance}
    unordered_set<int> visited;
    q.push({start, 0});
    visited.insert(start);
    while (!q.empty()) {
        auto [node, dist] = q.front();
        q.pop();
        if (node == end) return dist;
        for (int nei : graph[node]) {
            if (visited.find(nei) == visited.end()) {
                visited.insert(nei); // mark BEFORE enqueue
                q.push({nei, dist + 1});
            }
        }
    }
    return -1;
}`,
        tc: ["Time: O(V + E)", "Space: O(V)"],
        problems: ["Word Ladder", "Rotting Oranges", "01 Matrix", "Shortest Path in Binary Matrix", "Jump Game III"]
      },
      {
        name: "DFS / Union-Find — Components",
        diff: "medium",
        when: "Number of islands, connected components, detect cycle, graph coloring (bipartite).",
        insight: "For grids: DFS/BFS marking visited by modifying in place (set to '#' or 0). Union-Find: rank + path compression gives near O(1) per operation. Use for dynamic connectivity.",
        template: `// Grid DFS — flood fill style
void dfs(vector<vector<char>>& grid, int r, int c) {
    if (r < 0 || c < 0 || r >= grid.size() || c >= grid[0].size()) return;
    if (grid[r][c] != '1') return;
    grid[r][c] = '#'; // mark visited
    vector<pair<int, int>> dirs = {{0,1}, {0,-1}, {1,0}, {-1,0}};
    for (auto [dr, dc] : dirs) {
        dfs(grid, r + dr, c + dc);
    }
}

int numIslands(vector<vector<char>>& grid) {
    int count = 0;
    for (int r = 0; r < grid.size(); r++) {
        for (int c = 0; c < grid[0].size(); c++) {
            if (grid[r][c] == '1') {
                dfs(grid, r, c);
                count++;
            }
        }
    }
    return count;
}`,
        tc: ["Time: O(V + E)", "Space: O(V)"],
        problems: ["Number of Islands", "Pacific Atlantic Water Flow", "Course Schedule", "Clone Graph", "Graph Valid Tree"]
      },
      {
        name: "Topological Sort",
        diff: "hard",
        when: "Dependency ordering, course schedule, build order, detect cycle in directed graph.",
        insight: "Kahn's algo (BFS): add all 0-indegree nodes, remove edges as you process. DFS: post-order reversal. If all nodes not processed = cycle exists.",
        template: `vector<int> topoSort(int numCourses, const vector<pair<int, int>>& prerequisites) {
    vector<vector<int>> graph(numCourses);
    vector<int> indegree(numCourses, 0);
    for (auto [a, b] : prerequisites) {
        graph[b].push_back(a);
        indegree[a]++;
    }
    queue<int> q;
    for (int i = 0; i < numCourses; i++) {
        if (indegree[i] == 0) q.push(i);
    }
    vector<int> order;
    while (!q.empty()) {
        int node = q.front();
        q.pop();
        order.push_back(node);
        for (int nei : graph[node]) {
            indegree[nei]--;
            if (indegree[nei] == 0) q.push(nei);
        }
    }
    return order.size() == numCourses ? order : vector<int>();
}`,
        tc: ["Time: O(V + E)", "Space: O(V)"],
        problems: ["Course Schedule I & II", "Alien Dictionary", "Minimum Height Trees", "Sequence Reconstruction"]
      }
    ]
  },
  {
    id: "dp",
    icon: "◉",
    label: "Dynamic Programming",
    sub: "Overlapping subproblems + optimal substructure",
    patterns: [
      {
        name: "1D DP — Linear",
        diff: "medium",
        when: "Fibonacci-style, climbing stairs, house robber, decode ways. Current state depends on 1-2 previous states.",
        insight: "Start with recursion + memo, then convert to bottom-up. Ask: 'What is dp[i]?' Define it clearly. Build from base cases. Often space can be reduced to O(1) using two variables.",
        template: `// House Robber pattern
int rob(const vector<int>& nums) {
    if (nums.empty()) return 0;
    if (nums.size() == 1) return nums[0];
    int prev2 = 0, prev1 = 0;
    for (int n : nums) {
        int curr = max(prev1, prev2 + n);
        prev2 = prev1;
        prev1 = curr;
    }
    return prev1;
}

// Decode Ways pattern (counting)
int numDecodings(const string& s) {
    unordered_map<int, int> dp;
    dp[s.length()] = 1;
    for (int i = s.length() - 1; i >= 0; i--) {
        if (s[i] == '0') {
            dp[i] = 0;
        } else {
            dp[i] = dp[i + 1];
            if (i + 1 < s.length() && stoi(s.substr(i, 2)) <= 26) {
                dp[i] += dp[i + 2];
            }
        }
    }
    return dp[0];
}`,
        tc: ["Time: O(n)", "Space: O(1) or O(n)"],
        problems: ["Climbing Stairs", "House Robber I & II", "Decode Ways", "Jump Game", "Min Cost Climbing Stairs"]
      },
      {
        name: "2D DP — Grid / String",
        diff: "hard",
        when: "LCS, edit distance, unique paths, coin change 2D, matrix chain, regex matching.",
        insight: "dp[i][j] represents answer for subproblem of first i chars/rows and first j chars/cols. Build left-to-right, top-to-bottom. Draw the table first!",
        template: `// Edit Distance (LCS pattern)
int minDistance(const string& word1, const string& word2) {
    int m = word1.length(), n = word2.length();
    vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
    for (int i = 0; i <= m; i++) dp[i][0] = i;
    for (int j = 0; j <= n; j++) dp[0][j] = j;
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (word1[i - 1] == word2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                dp[i][j] = 1 + min({dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]});
            }
        }
    }
    return dp[m][n];
}`,
        tc: ["Time: O(m×n)", "Space: O(m×n) → O(n)"],
        problems: ["Longest Common Subsequence", "Edit Distance", "Unique Paths", "Coin Change", "Regular Expression Matching"]
      },
      {
        name: "Knapsack Variants",
        diff: "hard",
        when: "0/1 knapsack (each item once), unbounded (unlimited), subset sum, partition equal subset.",
        insight: "0/1: iterate items outer, capacity inner (reversed). Unbounded: iterate capacity inner (forward). Subset sum: boolean dp. Always think: 'take or not take'.",
        template: `// 0/1 Knapsack — subset sum
bool canPartition(const vector<int>& nums) {
    int total = accumulate(nums.begin(), nums.end(), 0);
    if (total % 2 != 0) return false;
    int target = total / 2;
    unordered_set<int> dp = {0};
    for (int n : nums) {
        unordered_set<int> nextDp = dp;
        for (int s : dp) {
            if (s + n == target) return true;
            nextDp.insert(s + n);
        }
        dp = nextDp;
    }
    return dp.count(target);
}

// Coin change — unbounded
int coinChange(const vector<int>& coins, int amount) {
    vector<int> dp(amount + 1, 1e9);
    dp[0] = 0;
    for (int c : coins) {
        for (int a = c; a <= amount; a++) {
            dp[a] = min(dp[a], dp[a - c] + 1);
        }
    }
    return dp[amount] != 1e9 ? dp[amount] : -1;
}`,
        tc: ["Time: O(n × W)", "Space: O(W)"],
        problems: ["Partition Equal Subset Sum", "Coin Change", "Target Sum", "Last Stone Weight II", "Ones and Zeroes"]
      }
    ]
  },
  {
    id: "heapstack",
    icon: "▲",
    label: "Heap, Stack & Monotonic",
    sub: "Greedy ordering and efficient extremes",
    patterns: [
      {
        name: "Heap — Top K Problems",
        diff: "medium",
        when: "K largest, K most frequent, K closest, merge K sorted lists, median of stream.",
        insight: "Use min-heap of size K for K largest (counter-intuitive: small heap = K largest). Use max-heap for K smallest. priority_queue in C++ is a max-heap by default.",
        template: `// K largest elements
vector<int> kLargest(const vector<int>& nums, int k) {
    priority_queue<int, vector<int>, greater<int>> minHeap;
    for (int n : nums) {
        minHeap.push(n);
        if (minHeap.size() > k) minHeap.pop();
    }
    vector<int> res;
    while (!minHeap.empty()) {
        res.push_back(minHeap.top());
        minHeap.pop();
    }
    return res;
}

// Median from stream
class MedianFinder {
    priority_queue<int> lo; // max-heap
    priority_queue<int, vector<int>, greater<int>> hi; // min-heap
public:
    void addNum(int n) {
        lo.push(n);
        hi.push(lo.top());
        lo.pop();
        if (hi.size() > lo.size()) {
            lo.push(hi.top());
            hi.pop();
        }
    }
    double findMedian() {
        return lo.size() > hi.size() ? lo.top() : (lo.top() + hi.top()) / 2.0;
    }
};`,
        tc: ["Time: O(n log k)", "Space: O(k)"],
        problems: ["Kth Largest Element", "Top K Frequent Elements", "K Closest Points", "Find Median from Stream", "Merge K Sorted Lists"]
      },
      {
        name: "Monotonic Stack",
        diff: "hard",
        when: "Next greater/smaller element, largest rectangle in histogram, daily temperatures, stock span, trapping rain water.",
        insight: "Maintain a stack that is strictly increasing or decreasing. Pop when current element breaks the monotonic property — that's when you find the answer for popped elements.",
        template: `// Next Greater Element
vector<int> nextGreaterElement(const vector<int>& nums) {
    vector<int> result(nums.size(), -1);
    stack<int> st; // stores indices, decreasing values
    for (int i = 0; i < nums.size(); i++) {
        while (!st.empty() && nums[st.top()] < nums[i]) {
            int idx = st.top();
            st.pop();
            result[idx] = nums[i];
        }
        st.push(i);
    }
    return result;
}

// Largest Rectangle in Histogram
int largestRectangle(vector<int>& heights) {
    stack<pair<int, int>> st; // {start_index, height}
    int maxArea = 0;
    heights.push_back(0);
    for (int i = 0; i < heights.size(); i++) {
        int start = i;
        while (!st.empty() && st.top().second > heights[i]) {
            auto [idx, height] = st.top();
            st.pop();
            maxArea = max(maxArea, height * (i - idx));
            start = idx;
        }
        st.push({start, heights[i]});
    }
    return maxArea;
}`,
        tc: ["Time: O(n)", "Space: O(n)"],
        problems: ["Daily Temperatures", "Next Greater Element I & II", "Largest Rectangle in Histogram", "Trapping Rain Water", "Stock Span Problem"]
      }
    ]
  },
  {
    id: "backtrack",
    icon: "⎇",
    label: "Backtracking & Recursion",
    sub: "Explore all possibilities, prune early",
    patterns: [
      {
        name: "Subsets / Combinations / Permutations",
        diff: "medium",
        when: "Generate all subsets, combinations (order doesn't matter), permutations (order matters), N-Queens, Sudoku.",
        insight: "Template is the same for all three — only the branching logic differs. For combinations: start index moves forward. For permutations: use a visited set. Always add to result at the right point.",
        template: `// Universal subsets backtrack template
vector<vector<int>> result;
void backtrack(const vector<int>& nums, int start, vector<int>& path) {
    result.push_back(path); // subsets: add at every level
    for (int i = start; i < nums.size(); i++) {
        if (i > start && nums[i] == nums[i - 1]) continue; // skip dups
        path.push_back(nums[i]);
        backtrack(nums, i + 1, path); // i+1 = no reuse
        path.pop_back();
    }
}

// Permutations
vector<vector<int>> permute(vector<int>& nums) {
    vector<vector<int>> res;
    unordered_set<int> used;
    vector<int> path;
    auto bt = [&](auto& self) -> void {
        if (path.size() == nums.size()) {
            res.push_back(path);
            return;
        }
        for (int i = 0; i < nums.size(); i++) {
            if (used.count(i)) continue;
            used.insert(i); path.push_back(nums[i]);
            self(self);
            path.pop_back(); used.erase(i);
        }
    };
    bt(bt);
    return res;
}`,
        tc: ["Time: O(2^n) subsets, O(n!) perms", "Space: O(n)"],
        problems: ["Subsets I & II", "Combinations", "Permutations I & II", "Combination Sum", "Letter Combinations of Phone Number"]
      },
      {
        name: "Grid Backtracking",
        diff: "hard",
        when: "Word search in grid, N-Queens, Sudoku solver. Path must be found in 2D space.",
        insight: "Mark cell visited before recursing, unmark after (backtrack). Check boundaries first. For N-Queens: track rows, cols, and both diagonals (r-c and r+c are unique per diagonal).",
        template: `// Word Search in Grid
bool dfs(vector<vector<char>>& board, const string& word, int r, int c, int i, set<pair<int, int>>& path) {
    if (i == word.length()) return true;
    if (r < 0 || c < 0 || r >= board.size() || c >= board[0].size()) return false;
    if (board[r][c] != word[i] || path.count({r, c})) return false;
    
    path.insert({r, c});
    bool res = dfs(board, word, r + 1, c, i + 1, path) ||
               dfs(board, word, r - 1, c, i + 1, path) ||
               dfs(board, word, r, c + 1, i + 1, path) ||
               dfs(board, word, r, c - 1, i + 1, path);
    path.erase({r, c});
    return res;
}

bool exist(vector<vector<char>>& board, string word) {
    set<pair<int, int>> path;
    for (int r = 0; r < board.size(); r++) {
        for (int c = 0; c < board[0].size(); c++) {
            if (dfs(board, word, r, c, 0, path)) return true;
        }
    }
    return false;
}`,
        tc: ["Time: O(n × 4^L)", "Space: O(L) where L=word length"],
        problems: ["Word Search I & II", "N-Queens", "Sudoku Solver", "Palindrome Partitioning", "Generate Parentheses"]
      }
    ]
  },
  {
    id: "trie",
    icon: "T",
    label: "Trie & Design",
    sub: "Prefix trees and system design patterns",
    patterns: [
      {
        name: "Trie (Prefix Tree)",
        diff: "medium",
        when: "Autocomplete, word search with prefix/wildcard, longest common prefix, word dictionary with search.",
        insight: "Each node is a hashmap of children + is_end flag. insert=O(L), search=O(L), prefix=O(L). For wildcard '.', try all children recursively.",
        template: `class TrieNode {
public:
    unordered_map<char, TrieNode*> children;
    bool is_end = false;
};

class Trie {
    TrieNode* root;
public:
    Trie() { root = new TrieNode(); }
    
    void insert(const string& word) {
        TrieNode* node = root;
        for (char c : word) {
            if (!node->children.count(c)) {
                node->children[c] = new TrieNode();
            }
            node = node->children[c];
        }
        node->is_end = true;
    }
    
    bool search(const string& word) {
        TrieNode* node = root;
        for (char c : word) {
            if (!node->children.count(c)) return false;
            node = node->children[c];
        }
        return node->is_end;
    }
    
    bool startsWith(const string& prefix) {
        TrieNode* node = root;
        for (char c : prefix) {
            if (!node->children.count(c)) return false;
            node = node->children[c];
        }
        return true;
    }
};`,
        tc: ["Insert/Search: O(L)", "Space: O(ALPHABET × N × L)"],
        problems: ["Implement Trie", "Add and Search Word", "Word Search II", "Replace Words", "Design Search Autocomplete"]
      }
    ]
  },
  {
    id: "intervals",
    icon: "↔",
    label: "Intervals & Greedy",
    sub: "Sort first, then sweep",
    patterns: [
      {
        name: "Interval Merging & Scheduling",
        diff: "medium",
        when: "Overlapping intervals, meeting rooms, merge intervals, insert interval, minimum platforms.",
        insight: "Always sort by start time first. Two intervals overlap if start2 <= end1. For scheduling: check if start of next < end of current. Use min-heap for minimum rooms.",
        template: `// Merge Intervals
vector<vector<int>> merge(vector<vector<int>>& intervals) {
    if (intervals.empty()) return {};
    sort(intervals.begin(), intervals.end());
    vector<vector<int>> merged = {intervals[0]};
    for (int i = 1; i < intervals.size(); i++) {
        if (intervals[i][0] <= merged.back()[1]) {
            merged.back()[1] = max(merged.back()[1], intervals[i][1]);
        } else {
            merged.push_back(intervals[i]);
        }
    }
    return merged;
}

// Min Meeting Rooms (heap)
int minMeetingRooms(vector<vector<int>>& intervals) {
    if (intervals.empty()) return 0;
    sort(intervals.begin(), intervals.end());
    priority_queue<int, vector<int>, greater<int>> minHeap;
    for (const auto& interval : intervals) {
        if (!minHeap.empty() && minHeap.top() <= interval[0]) {
            minHeap.pop();
        }
        minHeap.push(interval[1]);
    }
    return minHeap.size();
}`,
        tc: ["Time: O(n log n)", "Space: O(n)"],
        problems: ["Merge Intervals", "Insert Interval", "Meeting Rooms II", "Non-overlapping Intervals", "Minimum Interval to Include Each Query"]
      },
      {
        name: "Greedy Algorithms",
        diff: "hard",
        when: "Locally optimal choice leads to globally optimal. Jump game, gas station, task scheduler, candy distribution.",
        insight: "Prove greedy works: exchange argument (swapping greedy choice with any other doesn't improve the answer). If greedy doesn't work, use DP.",
        template: `// Jump Game II — greedy
int jump(const vector<int>& nums) {
    int jumps = 0, farthest = 0, end = 0;
    for (int i = 0; i < nums.size() - 1; i++) {
        farthest = max(farthest, i + nums[i]);
        if (i == end) {
            jumps++;
            end = farthest;
        }
    }
    return jumps;
}

// Gas Station — greedy
int canCompleteCircuit(const vector<int>& gas, const vector<int>& cost) {
    int total = 0, curr = 0, start = 0;
    for (int i = 0; i < gas.size(); i++) {
        int diff = gas[i] - cost[i];
        total += diff; curr += diff;
        if (curr < 0) {
            start = i + 1;
            curr = 0;
        }
    }
    return total >= 0 ? start : -1;
}`,
        tc: ["Time: O(n)", "Space: O(1)"],
        problems: ["Jump Game I & II", "Gas Station", "Task Scheduler", "Candy", "Partition Labels"]
      }
    ]
  }
];

// ── State ──────────────────────────────────────────────────
let currentTopicId = 'arrays';
let searchQuery = '';

// ── DOM Refs ───────────────────────────────────────────────
const navList      = document.getElementById('nav-list');
const patternsList = document.getElementById('patterns-list');
const topicTitle   = document.getElementById('topic-title');
const topicSub     = document.getElementById('topic-subtitle');
const searchInput  = document.getElementById('search-input');
const btnExpand    = document.getElementById('btn-expand');
const btnCollapse  = document.getElementById('btn-collapse');

// ── Build Navigation ───────────────────────────────────────
function buildNav() {
  navList.innerHTML = '';
  topics.forEach(t => {
    const div = document.createElement('div');
    div.className = 'nav-item' + (t.id === currentTopicId ? ' active' : '');
    div.dataset.id = t.id;
    div.innerHTML = `
      <span class="nav-icon">${t.icon}</span>
      ${t.label}
      <span class="nav-badge">${t.patterns.length}</span>`;
    div.addEventListener('click', () => {
      searchInput.value = '';
      searchQuery = '';
      loadTopic(t.id);
    });
    navList.appendChild(div);
  });
}

// ── Load Topic ─────────────────────────────────────────────
function loadTopic(id) {
  currentTopicId = id;
  const topic = topics.find(t => t.id === id);

  // Update nav active state
  document.querySelectorAll('.nav-item').forEach(el => {
    el.classList.toggle('active', el.dataset.id === id);
  });

  topicTitle.textContent = topic.label;
  topicSub.textContent   = topic.sub;

  renderPatterns(topic.patterns);
}

// ── Render Patterns ────────────────────────────────────────
function renderPatterns(patterns) {
  patternsList.innerHTML = '';

  if (patterns.length === 0) {
    patternsList.innerHTML = '<div class="no-results">No patterns found. Try a different search.</div>';
    return;
  }

  patterns.forEach(p => {
    const card = document.createElement('div');
    card.className = 'pattern-card';
    card.dataset.name = p.name.toLowerCase();

    const whenText    = highlight(p.when,    searchQuery);
    const insightText = highlight(p.insight, searchQuery);
    const nameText    = highlight(p.name,    searchQuery);

    card.innerHTML = `
      <div class="pattern-header" role="button" tabindex="0" aria-expanded="false">
        <div class="pattern-left">
          <span class="diff-badge diff-${p.diff}">${p.diff}</span>
          <span class="pattern-name">${nameText}</span>
        </div>
        <span class="chevron">▾</span>
      </div>
      <div class="pattern-body">
        <div class="section-label">When to use</div>
        <div class="insight-box">${whenText}</div>

        <div class="section-label">Key insight</div>
        <div class="insight-box">${insightText}</div>

        <div class="section-label">Template code</div>
        <div class="code-wrap">
          <button class="copy-btn" data-code="${escapeAttr(p.template)}">Copy</button>
          <pre class="code-block">${escapeHtml(p.template)}</pre>
        </div>

        <div class="section-label">Complexity</div>
        <div class="tc-row">${p.tc.map(t => `<span class="tc-chip">${t}</span>`).join('')}</div>

        <div class="section-label">Must-solve problems</div>
        <div class="problems-row">${p.problems.map(prob =>
          `<a class="prob-tag" href="https://leetcode.com/problemset/?search=${encodeURIComponent(prob)}" target="_blank" rel="noopener">${prob}</a>`
        ).join('')}</div>
      </div>`;

    // Toggle expand/collapse
    const header = card.querySelector('.pattern-header');
    header.addEventListener('click', () => toggleCard(card));
    header.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') toggleCard(card); });

    // Copy button
    card.querySelector('.copy-btn').addEventListener('click', e => {
      e.stopPropagation();
      const code = e.target.dataset.code;
      navigator.clipboard.writeText(code).then(() => {
        e.target.textContent = 'Copied!';
        e.target.classList.add('copied');
        setTimeout(() => {
          e.target.textContent = 'Copy';
          e.target.classList.remove('copied');
        }, 2000);
      });
    });

    patternsList.appendChild(card);
  });
}

function toggleCard(card) {
  const body    = card.querySelector('.pattern-body');
  const chevron = card.querySelector('.chevron');
  const header  = card.querySelector('.pattern-header');
  const isOpen  = body.classList.contains('open');
  body.classList.toggle('open', !isOpen);
  chevron.classList.toggle('open', !isOpen);
  card.classList.toggle('expanded', !isOpen);
  header.setAttribute('aria-expanded', String(!isOpen));
}

// ── Expand / Collapse All ──────────────────────────────────
btnExpand.addEventListener('click', () => {
  document.querySelectorAll('.pattern-card').forEach(card => {
    card.querySelector('.pattern-body').classList.add('open');
    card.querySelector('.chevron').classList.add('open');
    card.classList.add('expanded');
    card.querySelector('.pattern-header').setAttribute('aria-expanded', 'true');
  });
});

btnCollapse.addEventListener('click', () => {
  document.querySelectorAll('.pattern-card').forEach(card => {
    card.querySelector('.pattern-body').classList.remove('open');
    card.querySelector('.chevron').classList.remove('open');
    card.classList.remove('expanded');
    card.querySelector('.pattern-header').setAttribute('aria-expanded', 'false');
  });
});

// ── Search ─────────────────────────────────────────────────
searchInput.addEventListener('input', () => {
  searchQuery = searchInput.value.trim().toLowerCase();

  if (!searchQuery) {
    loadTopic(currentTopicId);
    return;
  }

  // Search across ALL topics
  const matched = [];
  topics.forEach(topic => {
    topic.patterns.forEach(p => {
      const haystack = (p.name + p.when + p.insight + p.problems.join(' ')).toLowerCase();
      if (haystack.includes(searchQuery)) matched.push(p);
    });
  });

  topicTitle.textContent = `Search: "${searchInput.value}"`;
  topicSub.textContent   = `${matched.length} pattern${matched.length !== 1 ? 's' : ''} found across all topics`;
  renderPatterns(matched);
});

// ── Helpers ────────────────────────────────────────────────
function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function escapeAttr(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function highlight(text, query) {
  if (!query) return text;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp(`(${escaped})`, 'gi');
  return text.replace(re, '<mark class="highlight">$1</mark>');
}

// ── Init ───────────────────────────────────────────────────
buildNav();
loadTopic('arrays');
