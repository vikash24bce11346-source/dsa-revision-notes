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
        template: `def two_pointers(arr):
    l, r = 0, len(arr) - 1
    while l < r:
        if condition_met(arr[l], arr[r]):
            # process answer
            l += 1; r -= 1
        elif need_larger:
            l += 1
        else:
            r -= 1`,
        tc: ["Time: O(n)", "Space: O(1)"],
        problems: ["Two Sum II", "3Sum", "Container With Most Water", "Valid Palindrome", "Trapping Rain Water"]
      },
      {
        name: "Sliding Window",
        diff: "medium",
        when: "Subarray/substring with constraint (max, min, exactly k). Fixed or variable window size. Contiguous elements required.",
        insight: "Expand right always. Shrink left when window violates constraint. Track state with a hashmap or counter. Never reset — slide!",
        template: `def sliding_window(s):
    l = 0; best = 0; state = {}
    for r in range(len(s)):
        state[s[r]] = state.get(s[r], 0) + 1
        while window_invalid(state):
            state[s[l]] -= 1
            if state[s[l]] == 0: del state[s[l]]
            l += 1
        best = max(best, r - l + 1)
    return best`,
        tc: ["Time: O(n)", "Space: O(k) where k=window"],
        problems: ["Longest Substring Without Repeating", "Minimum Window Substring", "Fruit Into Baskets", "Longest Repeating Char Replacement", "Permutation in String"]
      },
      {
        name: "Prefix Sum",
        diff: "easy",
        when: "Range sum queries, subarray sum equals k, 2D range queries. Pre-process once, answer queries in O(1).",
        insight: "prefix[i] = sum of arr[0..i-1]. Range sum [l,r] = prefix[r+1] - prefix[l]. Combine with hashmap for 'subarray sum = k'.",
        template: `# Subarray sum equals k
def subarraySum(nums, k):
    count = 0; curr = 0
    seen = {0: 1}
    for n in nums:
        curr += n
        count += seen.get(curr - k, 0)
        seen[curr] = seen.get(curr, 0) + 1
    return count`,
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
        insight: "NEVER use mid=(l+r)/2 (overflow). Use mid=l+(r-l)//2. Three templates: find exact, find leftmost, find rightmost. Know which one to apply.",
        template: `# Find leftmost occurrence
def binary_search(nums, target):
    l, r = 0, len(nums) - 1
    result = -1
    while l <= r:
        mid = l + (r - l) // 2
        if nums[mid] == target:
            result = mid
            r = mid - 1  # keep searching left
        elif nums[mid] < target:
            l = mid + 1
        else:
            r = mid - 1
    return result`,
        tc: ["Time: O(log n)", "Space: O(1)"],
        problems: ["Binary Search", "Search Insert Position", "First and Last Position", "Search in Rotated Array", "Find Minimum in Rotated Array"]
      },
      {
        name: "Binary Search on Answer",
        diff: "hard",
        when: '"Minimize the maximum" or "Maximize the minimum" problems. The answer itself is monotonic — if X works, X+1 also works (or vice versa).',
        insight: "Define a feasibility function is_possible(mid). Binary search on the answer range (not index). This converts hard problems into medium ones.",
        template: `def solve(nums, m):
    def is_possible(limit):
        count = 1; curr = 0
        for n in nums:
            if curr + n > limit:
                count += 1; curr = 0
            curr += n
        return count <= m

    l, r = max(nums), sum(nums)
    while l < r:
        mid = l + (r - l) // 2
        if is_possible(mid): r = mid
        else: l = mid + 1
    return l`,
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
        template: `def has_cycle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            # Find cycle start:
            slow = head
            while slow != fast:
                slow = slow.next
                fast = fast.next
            return slow  # cycle start
    return None`,
        tc: ["Time: O(n)", "Space: O(1)"],
        problems: ["Linked List Cycle II", "Middle of Linked List", "Happy Number", "Find Duplicate Number", "Reorder List"]
      },
      {
        name: "Reverse / In-Place",
        diff: "medium",
        when: "Reverse entire list, reverse in groups (k), reverse between indices, palindrome check.",
        insight: "Track prev, curr, next. Update next before moving. For group reversal, recurse or track group boundaries. DRAW IT OUT before coding.",
        template: `def reverse_list(head):
    prev, curr = None, head
    while curr:
        nxt = curr.next
        curr.next = prev
        prev = curr
        curr = nxt
    return prev

def reverse_between(head, l, r):
    dummy = ListNode(0, head); prev = dummy
    for _ in range(l - 1): prev = prev.next
    curr = prev.next
    for _ in range(r - l):
        nxt = curr.next
        curr.next = nxt.next
        nxt.next = prev.next
        prev.next = nxt
    return dummy.next`,
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
        template: `# Generic DFS — returns answer to parent
def dfs(node):
    if not node: return base_case
    left = dfs(node.left)
    right = dfs(node.right)
    # Combine left, right, node.val
    return combined_result

# Path sum (pass down)
def path_sum(node, target):
    if not node: return 0
    target -= node.val
    if not node.left and not node.right:
        return 1 if target == 0 else 0
    return path_sum(node.left, target) + path_sum(node.right, target)`,
        tc: ["Time: O(n)", "Space: O(h) where h=height"],
        problems: ["Max Depth", "Diameter of Tree", "LCA of BST", "Path Sum II", "Serialize & Deserialize BST"]
      },
      {
        name: "BFS / Level Order",
        diff: "easy",
        when: "Shortest path in unweighted tree/graph, level-by-level processing, min depth, right side view.",
        insight: "Use a deque. Process level by level using the queue size at the start of each iteration. Always pop from left, append to right.",
        template: `from collections import deque
def level_order(root):
    if not root: return []
    result = []; q = deque([root])
    while q:
        level = []
        for _ in range(len(q)):  # snapshot size
            node = q.popleft()
            level.append(node.val)
            if node.left: q.append(node.left)
            if node.right: q.append(node.right)
        result.append(level)
    return result`,
        tc: ["Time: O(n)", "Space: O(w) where w=max width"],
        problems: ["Level Order Traversal", "Right Side View", "Min Depth", "ZigZag Traversal", "Connect Next Right Pointers"]
      },
      {
        name: "BST Properties",
        diff: "medium",
        when: "Validate BST, kth smallest, range sum, in-order successor, insert/delete.",
        insight: "In-order traversal of BST gives sorted order. For validate: pass (min_bound, max_bound) down — not just compare with parent. kth smallest = in-order traversal counting.",
        template: `# Validate BST
def isValidBST(root, lo=float('-inf'), hi=float('inf')):
    if not root: return True
    if not (lo < root.val < hi): return False
    return (isValidBST(root.left, lo, root.val) and
            isValidBST(root.right, root.val, hi))

# Kth Smallest — iterative in-order
def kthSmallest(root, k):
    stack = []; node = root
    while stack or node:
        while node: stack.append(node); node = node.left
        node = stack.pop(); k -= 1
        if k == 0: return node.val
        node = node.right`,
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
        template: `from collections import deque
def bfs_shortest(graph, start, end):
    q = deque([(start, 0)])
    visited = {start}
    while q:
        node, dist = q.popleft()
        if node == end: return dist
        for nei in graph[node]:
            if nei not in visited:
                visited.add(nei)  # mark BEFORE enqueue
                q.append((nei, dist + 1))
    return -1`,
        tc: ["Time: O(V + E)", "Space: O(V)"],
        problems: ["Word Ladder", "Rotting Oranges", "01 Matrix", "Shortest Path in Binary Matrix", "Jump Game III"]
      },
      {
        name: "DFS / Union-Find — Components",
        diff: "medium",
        when: "Number of islands, connected components, detect cycle, graph coloring (bipartite).",
        insight: "For grids: DFS/BFS marking visited by modifying in place (set to '#' or 0). Union-Find: rank + path compression gives near O(1) per operation. Use for dynamic connectivity.",
        template: `# Grid DFS — flood fill style
def num_islands(grid):
    count = 0
    def dfs(r, c):
        if r < 0 or c < 0 or r >= len(grid) or c >= len(grid[0]): return
        if grid[r][c] != '1': return
        grid[r][c] = '#'  # mark visited
        for dr, dc in [(0,1),(0,-1),(1,0),(-1,0)]:
            dfs(r+dr, c+dc)
    for r in range(len(grid)):
        for c in range(len(grid[0])):
            if grid[r][c] == '1':
                dfs(r, c); count += 1
    return count`,
        tc: ["Time: O(V + E)", "Space: O(V)"],
        problems: ["Number of Islands", "Pacific Atlantic Water Flow", "Course Schedule", "Clone Graph", "Graph Valid Tree"]
      },
      {
        name: "Topological Sort",
        diff: "hard",
        when: "Dependency ordering, course schedule, build order, detect cycle in directed graph.",
        insight: "Kahn's algo (BFS): add all 0-indegree nodes, remove edges as you process. DFS: post-order reversal. If all nodes not processed = cycle exists.",
        template: `from collections import deque
def topo_sort(num_courses, prerequisites):
    graph = [[] for _ in range(num_courses)]
    indegree = [0] * num_courses
    for a, b in prerequisites:
        graph[b].append(a); indegree[a] += 1
    q = deque([i for i in range(num_courses) if indegree[i] == 0])
    order = []
    while q:
        node = q.popleft(); order.append(node)
        for nei in graph[node]:
            indegree[nei] -= 1
            if indegree[nei] == 0: q.append(nei)
    return order if len(order) == num_courses else []`,
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
        template: `# House Robber pattern
def rob(nums):
    if not nums: return 0
    if len(nums) == 1: return nums[0]
    prev2, prev1 = 0, 0
    for n in nums:
        curr = max(prev1, prev2 + n)
        prev2, prev1 = prev1, curr
    return prev1

# Decode Ways pattern (counting)
def numDecodings(s):
    dp = {len(s): 1}
    for i in range(len(s) - 1, -1, -1):
        if s[i] == '0': dp[i] = 0
        else:
            dp[i] = dp[i+1]
            if i+1 < len(s) and int(s[i:i+2]) <= 26:
                dp[i] += dp[i+2]
    return dp[0]`,
        tc: ["Time: O(n)", "Space: O(1) or O(n)"],
        problems: ["Climbing Stairs", "House Robber I & II", "Decode Ways", "Jump Game", "Min Cost Climbing Stairs"]
      },
      {
        name: "2D DP — Grid / String",
        diff: "hard",
        when: "LCS, edit distance, unique paths, coin change 2D, matrix chain, regex matching.",
        insight: "dp[i][j] represents answer for subproblem of first i chars/rows and first j chars/cols. Build left-to-right, top-to-bottom. Draw the table first!",
        template: `# Edit Distance (LCS pattern)
def minDistance(word1, word2):
    m, n = len(word1), len(word2)
    dp = [[0]*(n+1) for _ in range(m+1)]
    for i in range(m+1): dp[i][0] = i
    for j in range(n+1): dp[0][j] = j
    for i in range(1, m+1):
        for j in range(1, n+1):
            if word1[i-1] == word2[j-1]:
                dp[i][j] = dp[i-1][j-1]
            else:
                dp[i][j] = 1 + min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1])
    return dp[m][n]`,
        tc: ["Time: O(m×n)", "Space: O(m×n) → O(n)"],
        problems: ["Longest Common Subsequence", "Edit Distance", "Unique Paths", "Coin Change", "Regular Expression Matching"]
      },
      {
        name: "Knapsack Variants",
        diff: "hard",
        when: "0/1 knapsack (each item once), unbounded (unlimited), subset sum, partition equal subset.",
        insight: "0/1: iterate items outer, capacity inner (reversed). Unbounded: iterate capacity inner (forward). Subset sum: boolean dp. Always think: 'take or not take'.",
        template: `# 0/1 Knapsack — subset sum
def canPartition(nums):
    target = sum(nums)
    if target % 2: return False
    target //= 2
    dp = {0}
    for n in nums:
        dp = {s + n for s in dp} | dp
        if target in dp: return True
    return target in dp

# Coin change — unbounded
def coinChange(coins, amount):
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    for c in coins:
        for a in range(c, amount + 1):
            dp[a] = min(dp[a], dp[a-c] + 1)
    return dp[amount] if dp[amount] != float('inf') else -1`,
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
        insight: "Use min-heap of size K for K largest (counter-intuitive: small heap = K largest). Use max-heap for K smallest. heapq in Python is a min-heap; negate values for max-heap.",
        template: `import heapq

# K largest elements
def kLargest(nums, k):
    heap = []
    for n in nums:
        heapq.heappush(heap, n)
        if len(heap) > k:
            heapq.heappop(heap)
    return list(heap)

# K most frequent
def topKFrequent(nums, k):
    freq = Counter(nums)
    return heapq.nlargest(k, freq.keys(), key=freq.get)

# Median from stream
class MedianFinder:
    def __init__(self): self.lo=[]; self.hi=[]
    def addNum(self, n):
        heapq.heappush(self.lo, -n)
        heapq.heappush(self.hi, -heapq.heappop(self.lo))
        if len(self.hi) > len(self.lo):
            heapq.heappush(self.lo, -heapq.heappop(self.hi))`,
        tc: ["Time: O(n log k)", "Space: O(k)"],
        problems: ["Kth Largest Element", "Top K Frequent Elements", "K Closest Points", "Find Median from Stream", "Merge K Sorted Lists"]
      },
      {
        name: "Monotonic Stack",
        diff: "hard",
        when: "Next greater/smaller element, largest rectangle in histogram, daily temperatures, stock span, trapping rain water.",
        insight: "Maintain a stack that is strictly increasing or decreasing. Pop when current element breaks the monotonic property — that's when you find the answer for popped elements.",
        template: `# Next Greater Element
def nextGreaterElement(nums):
    result = [-1] * len(nums)
    stack = []  # stores indices, decreasing values
    for i, n in enumerate(nums):
        while stack and nums[stack[-1]] < n:
            idx = stack.pop()
            result[idx] = n
        stack.append(i)
    return result

# Largest Rectangle in Histogram
def largestRectangle(heights):
    stack = []; max_area = 0
    heights.append(0)
    for i, h in enumerate(heights):
        start = i
        while stack and stack[-1][1] > h:
            idx, height = stack.pop()
            max_area = max(max_area, height * (i - idx))
            start = idx
        stack.append((start, h))
    return max_area`,
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
        template: `# Universal backtrack template
def backtrack(start, path):
    result.append(path[:])  # subsets: add at every level
    # if len(path) == target: result.append(path[:]) # combos
    for i in range(start, len(nums)):
        if i > start and nums[i] == nums[i-1]: continue  # skip dups
        path.append(nums[i])
        backtrack(i + 1, path)  # i+1=no reuse; i=reuse allowed
        path.pop()

# Permutations
def permute(nums):
    result = []; used = set()
    def bt(path):
        if len(path) == len(nums): result.append(path[:]); return
        for i, n in enumerate(nums):
            if i in used: continue
            used.add(i); path.append(n); bt(path)
            path.pop(); used.remove(i)
    bt([]); return result`,
        tc: ["Time: O(2^n) subsets, O(n!) perms", "Space: O(n)"],
        problems: ["Subsets I & II", "Combinations", "Permutations I & II", "Combination Sum", "Letter Combinations of Phone Number"]
      },
      {
        name: "Grid Backtracking",
        diff: "hard",
        when: "Word search in grid, N-Queens, Sudoku solver. Path must be found in 2D space.",
        insight: "Mark cell visited before recursing, unmark after (backtrack). Check boundaries first. For N-Queens: track rows, cols, and both diagonals (r-c and r+c are unique per diagonal).",
        template: `# Word Search in Grid
def exist(board, word):
    ROWS, COLS = len(board), len(board[0])
    path = set()
    def dfs(r, c, i):
        if i == len(word): return True
        if r<0 or c<0 or r>=ROWS or c>=COLS: return False
        if board[r][c] != word[i] or (r,c) in path: return False
        path.add((r,c))
        res = (dfs(r+1,c,i+1) or dfs(r-1,c,i+1) or
               dfs(r,c+1,i+1) or dfs(r,c-1,i+1))
        path.remove((r,c))
        return res
    return any(dfs(r,c,0) for r in range(ROWS) for c in range(COLS))`,
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
        template: `class TrieNode:
    def __init__(self): self.children={}; self.is_end=False

class Trie:
    def __init__(self): self.root = TrieNode()
    def insert(self, word):
        node = self.root
        for c in word:
            if c not in node.children:
                node.children[c] = TrieNode()
            node = node.children[c]
        node.is_end = True
    def search(self, word):
        node = self.root
        for c in word:
            if c not in node.children: return False
            node = node.children[c]
        return node.is_end
    def startsWith(self, prefix):
        node = self.root
        for c in prefix:
            if c not in node.children: return False
            node = node.children[c]
        return True`,
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
        template: `# Merge Intervals
def merge(intervals):
    intervals.sort(key=lambda x: x[0])
    merged = [intervals[0]]
    for start, end in intervals[1:]:
        if start <= merged[-1][1]:
            merged[-1][1] = max(merged[-1][1], end)
        else:
            merged.append([start, end])
    return merged

# Min Meeting Rooms (heap)
import heapq
def minMeetingRooms(intervals):
    intervals.sort()
    heap = []
    for start, end in intervals:
        if heap and heap[0] <= start:
            heapq.heapreplace(heap, end)
        else:
            heapq.heappush(heap, end)
    return len(heap)`,
        tc: ["Time: O(n log n)", "Space: O(n)"],
        problems: ["Merge Intervals", "Insert Interval", "Meeting Rooms II", "Non-overlapping Intervals", "Minimum Interval to Include Each Query"]
      },
      {
        name: "Greedy Algorithms",
        diff: "hard",
        when: "Locally optimal choice leads to globally optimal. Jump game, gas station, task scheduler, candy distribution.",
        insight: "Prove greedy works: exchange argument (swapping greedy choice with any other doesn't improve the answer). If greedy doesn't work, use DP.",
        template: `# Jump Game II — greedy
def jump(nums):
    jumps = farthest = end = 0
    for i in range(len(nums) - 1):
        farthest = max(farthest, i + nums[i])
        if i == end:
            jumps += 1
            end = farthest
    return jumps

# Gas Station — greedy
def canCompleteCircuit(gas, cost):
    total = curr = start = 0
    for i in range(len(gas)):
        diff = gas[i] - cost[i]
        total += diff; curr += diff
        if curr < 0: start = i + 1; curr = 0
    return start if total >= 0 else -1`,
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
    .replace(/"/g, '&quot;');
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
