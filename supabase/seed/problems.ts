/**
 * Problem seed data — matches the create-problem Zod schema (camelCase).
 *
 * Files:
 *   supabase/seed/problems.ts  ← edit / add problems here (source of truth)
 *   supabase/seed.sql          ← run this in Supabase SQL Editor to insert rows
 *
 * Column mapping for inserts:
 *   testCases           → test_cases
 *   codeSnippets        → code_snippets
 *   referenceSolutions  → reference_solutions
 *
 * Programmatic insert (service_role only — clients cannot write problems):
 *
 *   import { problemInserts } from '@/../supabase/seed/problems'
 *   await supabase.from('problems').insert(problemInserts)
 */

export type Difficulty = "EASY" | "MEDIUM" | "HARD";

export type LanguageExample = {
  input: string;
  output: string;
  explanation?: string;
};

export type ProblemSeed = {
  title: string;
  description: string;
  difficulty: Difficulty;
  tags: string[];
  constraints: string;
  hints?: string;
  editorial?: string;
  testCases: { input: string; output: string }[];
  examples: {
    JAVASCRIPT: LanguageExample;
    PYTHON: LanguageExample;
    JAVA: LanguageExample;
  };
  codeSnippets: {
    JAVASCRIPT: string;
    PYTHON: string;
    JAVA: string;
  };
  referenceSolutions: {
    JAVASCRIPT: string;
    PYTHON: string;
    JAVA: string;
  };
};

/** Row shape for public.problems */
export type ProblemInsert = {
  title: string;
  description: string;
  difficulty: Difficulty;
  tags: string[];
  constraints: string;
  hints: string | null;
  editorial: string | null;
  test_cases: ProblemSeed["testCases"];
  examples: ProblemSeed["examples"];
  code_snippets: ProblemSeed["codeSnippets"];
  reference_solutions: ProblemSeed["referenceSolutions"];
};

export function toProblemInsert(problem: ProblemSeed): ProblemInsert {
  return {
    title: problem.title,
    description: problem.description,
    difficulty: problem.difficulty,
    tags: problem.tags,
    constraints: problem.constraints,
    hints: problem.hints ?? null,
    editorial: problem.editorial ?? null,
    test_cases: problem.testCases,
    examples: problem.examples,
    code_snippets: problem.codeSnippets,
    reference_solutions: problem.referenceSolutions,
  };
}

export const sampleDpData: ProblemSeed = {
  title: "Climbing Stairs",
  description:
    "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
  difficulty: "EASY",
  tags: ["Dynamic Programming", "Math", "Memoization"],
  constraints: "1 <= n <= 45",
  hints:
    "To reach the nth step, you can either come from the (n-1)th step or the (n-2)th step.",
  editorial:
    "This is a classic dynamic programming problem. The number of ways to reach the nth step is the sum of the number of ways to reach the (n-1)th step and the (n-2)th step, forming a Fibonacci-like sequence.",
  testCases: [
    { input: "2", output: "2" },
    { input: "3", output: "3" },
    { input: "4", output: "5" },
  ],
  examples: {
    JAVASCRIPT: {
      input: "n = 2",
      output: "2",
      explanation:
        "There are two ways to climb to the top:\n1. 1 step + 1 step\n2. 2 steps",
    },
    PYTHON: {
      input: "n = 3",
      output: "3",
      explanation:
        "There are three ways to climb to the top:\n1. 1 step + 1 step + 1 step\n2. 1 step + 2 steps\n3. 2 steps + 1 step",
    },
    JAVA: {
      input: "n = 4",
      output: "5",
      explanation:
        "There are five ways to climb to the top:\n1. 1 step + 1 step + 1 step + 1 step\n2. 1 step + 1 step + 2 steps\n3. 1 step + 2 steps + 1 step\n4. 2 steps + 1 step + 1 step\n5. 2 steps + 2 steps",
    },
  },
  codeSnippets: {
    JAVASCRIPT: `/**
* @param {number} n
* @return {number}
*/
function climbStairs(n) {
// Write your code here
}

// Parse input and execute
const readline = require('readline');
const rl = readline.createInterface({
input: process.stdin,
output: process.stdout,
terminal: false
});

rl.on('line', (line) => {
const n = parseInt(line.trim());
const result = climbStairs(n);

console.log(result);
rl.close();
});`,
    PYTHON: `class Solution:
  def climbStairs(self, n: int) -> int:
      # Write your code here
      pass

# Input parsing
if __name__ == "__main__":
  import sys
  
  # Parse input
  n = int(sys.stdin.readline().strip())
  
  # Solve
  sol = Solution()
  result = sol.climbStairs(n)
  
  # Print result
  print(result)`,
    JAVA: `import java.util.Scanner;

class Main {
  public int climbStairs(int n) {
      // Write your code here
      return 0;
  }
  
  public static void main(String[] args) {
      Scanner scanner = new Scanner(System.in);
      int n = Integer.parseInt(scanner.nextLine().trim());
      
      // Use Main class instead of Solution
      Main main = new Main();
      int result = main.climbStairs(n);
      
      System.out.println(result);
      scanner.close();
  }
}`,
  },
  referenceSolutions: {
    JAVASCRIPT: `/**
* @param {number} n
* @return {number}
*/
function climbStairs(n) {
// Base cases
if (n <= 2) {
  return n;
}

// Dynamic programming approach
let dp = new Array(n + 1);
dp[1] = 1;
dp[2] = 2;

for (let i = 3; i <= n; i++) {
  dp[i] = dp[i - 1] + dp[i - 2];
}

return dp[n];
}`,
    PYTHON: `class Solution:
  def climbStairs(self, n: int) -> int:
      # Base cases
      if n <= 2:
          return n
      
      # Dynamic programming approach
      dp = [0] * (n + 1)
      dp[1] = 1
      dp[2] = 2
      
      for i in range(3, n + 1):
          dp[i] = dp[i - 1] + dp[i - 2]
      
      return dp[n]`,
    JAVA: `import java.util.Scanner;

class Main {
  public int climbStairs(int n) {
      // Base cases
      if (n <= 2) {
          return n;
      }
      
      // Dynamic programming approach
      int[] dp = new int[n + 1];
      dp[1] = 1;
      dp[2] = 2;
      
      for (int i = 3; i <= n; i++) {
          dp[i] = dp[i - 1] + dp[i - 2];
      }
      
      return dp[n];
  }
}`,
  },
};

export const sampleStringProblem: ProblemSeed = {
  title: "Valid Palindrome",
  description:
    "A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers. Given a string s, return true if it is a palindrome, or false otherwise.",
  difficulty: "EASY",
  tags: ["String", "Two Pointers"],
  constraints:
    "1 <= s.length <= 2 * 10^5\ns consists only of printable ASCII characters.",
  hints:
    "Consider using two pointers, one from the start and one from the end, moving towards the center.",
  editorial:
    "We can use two pointers approach to check if the string is a palindrome. One pointer starts from the beginning and the other from the end, moving towards each other.",
  testCases: [
    { input: "A man, a plan, a canal: Panama", output: "true" },
    { input: "race a car", output: "false" },
    { input: " ", output: "true" },
  ],
  examples: {
    JAVASCRIPT: {
      input: 's = "A man, a plan, a canal: Panama"',
      output: "true",
      explanation: '"amanaplanacanalpanama" is a palindrome.',
    },
    PYTHON: {
      input: 's = "A man, a plan, a canal: Panama"',
      output: "true",
      explanation: '"amanaplanacanalpanama" is a palindrome.',
    },
    JAVA: {
      input: 's = "A man, a plan, a canal: Panama"',
      output: "true",
      explanation: '"amanaplanacanalpanama" is a palindrome.',
    },
  },
  codeSnippets: {
    JAVASCRIPT: `/**
   * @param {string} s
   * @return {boolean}
   */
  function isPalindrome(s) {
    // Write your code here
  }
  
  // Add readline for dynamic input handling
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  });
  
  // Process input line
  rl.on('line', (line) => {
    // Call solution with the input string
    const result = isPalindrome(line);
    
    // Output the result
    console.log(result ? "true" : "false");
    rl.close();
  });`,
    PYTHON: `class Solution:
      def isPalindrome(self, s: str) -> bool:
          # Write your code here
          pass
  
  # Input parsing
  if __name__ == "__main__":
      import sys
      # Read the input string
      s = sys.stdin.readline().strip()
      
      # Call solution
      sol = Solution()
      result = sol.isPalindrome(s)
      
      # Output result
      print(str(result).lower())  # Convert True/False to lowercase true/false`,
    JAVA: `import java.util.Scanner;

public class Main {
    public static String preprocess(String s) {
        return s.replaceAll("[^a-zA-Z0-9]", "").toLowerCase();
    }

    public static boolean isPalindrome(String s) {
       
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine();

        boolean result = isPalindrome(input);
        System.out.println(result ? "true" : "false");
    }
}
`,
  },
  referenceSolutions: {
    JAVASCRIPT: `/**
   * @param {string} s
   * @return {boolean}
   */
  function isPalindrome(s) {
    // Convert to lowercase and remove non-alphanumeric characters
    s = s.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    // Check if it's a palindrome
    let left = 0;
    let right = s.length - 1;
    
    while (left < right) {
      if (s[left] !== s[right]) {
        return false;
      }
      left++;
      right--;
    }
    
    return true;
  }
  
  // Add readline for dynamic input handling
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  });
  
  // Process input line
  rl.on('line', (line) => {
    // Call solution with the input string
    const result = isPalindrome(line);
    
    // Output the result
    console.log(result ? "true" : "false");
    rl.close();
  });`,
    PYTHON: `class Solution:
      def isPalindrome(self, s: str) -> bool:
          # Convert to lowercase and keep only alphanumeric characters
          filtered_chars = [c.lower() for c in s if c.isalnum()]
          
          # Check if it's a palindrome
          return filtered_chars == filtered_chars[::-1]
  
  # Input parsing
  if __name__ == "__main__":
      import sys
      # Read the input string
      s = sys.stdin.readline().strip()
      
      # Call solution
      sol = Solution()
      result = sol.isPalindrome(s)
      
      # Output result
      print(str(result).lower())  # Convert True/False to lowercase true/false`,
    JAVA: `import java.util.Scanner;

public class Main {
    public static String preprocess(String s) {
        return s.replaceAll("[^a-zA-Z0-9]", "").toLowerCase();
    }

    public static boolean isPalindrome(String s) {
        s = preprocess(s);
        int left = 0, right = s.length() - 1;

        while (left < right) {
            if (s.charAt(left) != s.charAt(right)) return false;
            left++;
            right--;
        }

        return true;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine();

        boolean result = isPalindrome(input);
        System.out.println(result ? "true" : "false");
    }
}
`,
  },
};

export const problemSeed_1: ProblemSeed = {
  "title": "Two Sum",
  "description": "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.",
  "difficulty": "EASY",
  "tags": [
    "Arrays & Hashing",
    "Hash Table",
    "Array"
  ],
  "constraints": "2 <= nums.length <= 10^4\n-10^9 <= nums[i] <= 10^9\n-10^9 <= target <= 10^9\nOnly one valid answer exists.",
  "hints": "A really brute force way would be to search for all possible pairs of numbers but that would be too slow. Can we use a hash map to store each number and its index as we iterate?",
  "editorial": "Approach: Use a single pass hash table. As we iterate through nums, we compute complement = target - nums[i]. If complement is in our hash map, return its index and current index i. Otherwise, store nums[i] in the map.\nTime Complexity: O(n)\nSpace Complexity: O(n)",
  "testCases": [
    {
      "input": "[2,7,11,15]\n9",
      "output": "[0,1]"
    },
    {
      "input": "[3,2,4]\n6",
      "output": "[1,2]"
    },
    {
      "input": "[3,3]\n6",
      "output": "[0,1]"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "nums = [2,7,11,15], target = 9",
      "output": "[0,1]",
      "explanation": "Because nums[0] + nums[1] == 9, we return [0, 1]."
    },
    "PYTHON": {
      "input": "nums = [2,7,11,15], target = 9",
      "output": "[0,1]",
      "explanation": "Because nums[0] + nums[1] == 9, we return [0, 1]."
    },
    "JAVA": {
      "input": "nums = [2,7,11,15], target = 9",
      "output": "[0,1]",
      "explanation": "Because nums[0] + nums[1] == 9, we return [0, 1]."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number[]}\n */\nfunction twoSum(nums, target) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  const nums = JSON.parse(lines[0]);\n  const target = parseInt(lines[1], 10);\n  console.log(JSON.stringify(twoSum(nums, target)));\n});",
    "PYTHON": "import sys, json\n\nclass Solution:\n    def twoSum(self, nums: list[int], target: int) -> list[int]:\n        pass\n\nif __name__ == '__main__':\n    lines = [line.strip() for line in sys.stdin if line.strip()]\n    nums = json.loads(lines[0])\n    target = int(lines[1])\n    sol = Solution()\n    print(json.dumps(sol.twoSum(nums, target)))",
    "JAVA": "import java.util.*;\n\npublic class Main {\n    public int[] twoSum(int[] nums, int target) {\n        return new int[]{};\n    }\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s = sc.nextLine().trim();\n        s = s.substring(1, s.length() - 1);\n        String[] parts = s.split(\",\");\n        int[] nums = new int[parts.length];\n        for (int i = 0; i < parts.length; i++) nums[i] = Integer.parseInt(parts[i].trim());\n        int target = Integer.parseInt(sc.nextLine().trim());\n        Main m = new Main();\n        int[] res = m.twoSum(nums, target);\n        System.out.println(\"[\" + res[0] + \",\" + res[1] + \"]\");\n    }\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function twoSum(nums, target) {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const diff = target - nums[i];\n    if (map.has(diff)) {\n      return [map.get(diff), i];\n    }\n    map.set(nums[i], i);\n  }\n  return [];\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  const nums = JSON.parse(lines[0]);\n  const target = parseInt(lines[1], 10);\n  console.log(JSON.stringify(twoSum(nums, target)));\n});",
    "PYTHON": "import sys, json\n\nclass Solution:\n    def twoSum(self, nums: list[int], target: int) -> list[int]:\n        seen = {}\n        for i, n in enumerate(nums):\n            diff = target - n\n            if diff in seen:\n                return [seen[diff], i]\n            seen[n] = i\n        return []\n\nif __name__ == '__main__':\n    lines = [line.strip() for line in sys.stdin if line.strip()]\n    nums = json.loads(lines[0])\n    target = int(lines[1])\n    sol = Solution()\n    print(json.dumps(sol.twoSum(nums, target)))",
    "JAVA": "import java.util.*;\n\npublic class Main {\n    public int[] twoSum(int[] nums, int target) {\n        Map<Integer, Integer> map = new HashMap<>();\n        for (int i = 0; i < nums.length; i++) {\n            int diff = target - nums[i];\n            if (map.containsKey(diff)) {\n                return new int[]{map.get(diff), i};\n            }\n            map.put(nums[i], i);\n        }\n        return new int[]{};\n    }\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s = sc.nextLine().trim();\n        s = s.substring(1, s.length() - 1);\n        String[] parts = s.split(\",\");\n        int[] nums = new int[parts.length];\n        for (int i = 0; i < parts.length; i++) nums[i] = Integer.parseInt(parts[i].trim());\n        int target = Integer.parseInt(sc.nextLine().trim());\n        Main m = new Main();\n        int[] res = m.twoSum(nums, target);\n        System.out.println(\"[\" + res[0] + \",\" + res[1] + \"]\");\n    }\n}"
  }
};

export const problemSeed_2: ProblemSeed = {
  "title": "Group Anagrams",
  "description": "Given an array of strings strs, group the anagrams together. You can return the answer in any order. An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.",
  "difficulty": "MEDIUM",
  "tags": [
    "Arrays & Hashing",
    "Hash Table",
    "String",
    "Sorting"
  ],
  "constraints": "1 <= strs.length <= 10^4\n0 <= strs[i].length <= 100\nstrs[i] consists of lowercase English letters.",
  "hints": "Notice that words that are anagrams of each other will become identical after sorting their letters. What can be the hash map key?",
  "editorial": "Approach: For each word, sort its characters to produce a canonical representation (key). Group words with the same key together in a hash map.\nTime Complexity: O(n * k log k) where n is number of strings and k is max length.\nSpace Complexity: O(n * k)",
  "testCases": [
    {
      "input": "[\"eat\",\"tea\",\"tan\",\"ate\",\"nat\",\"bat\"]",
      "output": "[[\"bat\"],[\"nat\",\"tan\"],[\"ate\",\"eat\",\"tea\"]]"
    },
    {
      "input": "[\"\"]",
      "output": "[[\"\"]]"
    },
    {
      "input": "[\"a\"]",
      "output": "[[\"a\"]]"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "strs = [\"eat\",\"tea\",\"tan\",\"ate\",\"nat\",\"bat\"]",
      "output": "[[\"bat\"],[\"nat\",\"tan\"],[\"ate\",\"eat\",\"tea\"]]",
      "explanation": "An anagram group contains words with identical letter counts."
    },
    "PYTHON": {
      "input": "strs = [\"eat\",\"tea\",\"tan\",\"ate\",\"nat\",\"bat\"]",
      "output": "[[\"bat\"],[\"nat\",\"tan\"],[\"ate\",\"eat\",\"tea\"]]",
      "explanation": "An anagram group contains words with identical letter counts."
    },
    "JAVA": {
      "input": "strs = [\"eat\",\"tea\",\"tan\",\"ate\",\"nat\",\"bat\"]",
      "output": "[[\"bat\"],[\"nat\",\"tan\"],[\"ate\",\"eat\",\"tea\"]]",
      "explanation": "An anagram group contains words with identical letter counts."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "/**\n * @param {string[]} strs\n * @return {string[][]}\n */\nfunction groupAnagrams(strs) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nrl.on('line', (line) => {\n  const strs = JSON.parse(line.trim());\n  const res = groupAnagrams(strs);\n  // sort inner and outer for stable testing\n  res.forEach(g => g.sort());\n  res.sort((a, b) => a.length - b.length || a[0].localeCompare(b[0]));\n  console.log(JSON.stringify(res));\n  rl.close();\n});",
    "PYTHON": "import sys, json\n\nclass Solution:\n    def groupAnagrams(self, strs: list[str]) -> list[list[str]]:\n        pass\n\nif __name__ == '__main__':\n    line = sys.stdin.readline().strip()\n    strs = json.loads(line)\n    sol = Solution()\n    res = sol.groupAnagrams(strs)\n    for g in res:\n        g.sort()\n    res.sort(key=lambda x: (len(x), x[0] if x else ''))\n    print(json.dumps(res))",
    "JAVA": "import java.util.*;\n\npublic class Main {\n    public List<List<String>> groupAnagrams(String[] strs) {\n        return new ArrayList<>();\n    }\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String line = sc.nextLine().trim();\n        System.out.println(\"[]\");\n    }\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function groupAnagrams(strs) {\n  const map = new Map();\n  for (const s of strs) {\n    const key = s.split('').sort().join('');\n    if (!map.has(key)) map.set(key, []);\n    map.get(key).push(s);\n  }\n  return Array.from(map.values());\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nrl.on('line', (line) => {\n  const strs = JSON.parse(line.trim());\n  const res = groupAnagrams(strs);\n  res.forEach(g => g.sort());\n  res.sort((a, b) => a.length - b.length || a[0].localeCompare(b[0]));\n  console.log(JSON.stringify(res));\n  rl.close();\n});",
    "PYTHON": "import sys, json\nfrom collections import defaultdict\n\nclass Solution:\n    def groupAnagrams(self, strs: list[str]) -> list[list[str]]:\n        ans = defaultdict(list)\n        for s in strs:\n            ans[tuple(sorted(s))].append(s)\n        return list(ans.values())\n\nif __name__ == '__main__':\n    line = sys.stdin.readline().strip()\n    strs = json.loads(line)\n    sol = Solution()\n    res = sol.groupAnagrams(strs)\n    for g in res:\n        g.sort()\n    res.sort(key=lambda x: (len(x), x[0] if x else ''))\n    print(json.dumps(res))",
    "JAVA": "import java.util.*;\n\npublic class Main {\n    public List<List<String>> groupAnagrams(String[] strs) {\n        Map<String, List<String>> map = new HashMap<>();\n        for (String s : strs) {\n            char[] ca = s.toCharArray();\n            Arrays.sort(ca);\n            String key = String.valueOf(ca);\n            if (!map.containsKey(key)) map.put(key, new ArrayList<>());\n            map.get(key).add(s);\n        }\n        return new ArrayList<>(map.values());\n    }\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String line = sc.nextLine().trim();\n        line = line.substring(1, line.length() - 1);\n        String[] parts = line.split(\",\");\n        String[] strs = new String[parts.length];\n        for (int i = 0; i < parts.length; i++) {\n            strs[i] = parts[i].trim().replace(\"\"\", \"\");\n        }\n        Main m = new Main();\n        List<List<String>> res = m.groupAnagrams(strs);\n        System.out.println(res);\n    }\n}"
  }
};

export const problemSeed_3: ProblemSeed = {
  "title": "Contains Duplicate",
  "description": "Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.",
  "difficulty": "EASY",
  "tags": [
    "Arrays & Hashing",
    "Hash Table",
    "Array",
    "Sorting"
  ],
  "constraints": "1 <= nums.length <= 10^5\n-10^9 <= nums[i] <= 10^9",
  "hints": "Can you use a set or hash map to check whether an element has been encountered previously?",
  "editorial": "Approach: Use a hash set to track seen elements. If an element is already in the set, a duplicate is found. If the loop completes without duplicates, return false.\nTime Complexity: O(n)\nSpace Complexity: O(n)",
  "testCases": [
    {
      "input": "[1,2,3,1]",
      "output": "true"
    },
    {
      "input": "[1,2,3,4]",
      "output": "false"
    },
    {
      "input": "[1,1,1,3,3,4,3,2,4,2]",
      "output": "true"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "nums = [1,2,3,1]",
      "output": "true",
      "explanation": "1 appears twice in nums."
    },
    "PYTHON": {
      "input": "nums = [1,2,3,1]",
      "output": "true",
      "explanation": "1 appears twice in nums."
    },
    "JAVA": {
      "input": "nums = [1,2,3,1]",
      "output": "true",
      "explanation": "1 appears twice in nums."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "/**\n * @param {number[]} nums\n * @return {boolean}\n */\nfunction containsDuplicate(nums) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nrl.on('line', (line) => {\n  const nums = JSON.parse(line.trim());\n  console.log(containsDuplicate(nums) ? 'true' : 'false');\n  rl.close();\n});",
    "PYTHON": "import sys, json\n\nclass Solution:\n    def containsDuplicate(self, nums: list[int]) -> bool:\n        pass\n\nif __name__ == '__main__':\n    line = sys.stdin.readline().strip()\n    nums = json.loads(line)\n    sol = Solution()\n    print(str(sol.containsDuplicate(nums)).lower())",
    "JAVA": "import java.util.*;\n\npublic class Main {\n    public boolean containsDuplicate(int[] nums) {\n        return false;\n    }\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s = sc.nextLine().trim();\n        s = s.substring(1, s.length() - 1);\n        String[] parts = s.split(\",\");\n        int[] nums = new int[parts.length];\n        for (int i = 0; i < parts.length; i++) nums[i] = Integer.parseInt(parts[i].trim());\n        Main m = new Main();\n        System.out.println(m.containsDuplicate(nums) ? \"true\" : \"false\");\n    }\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function containsDuplicate(nums) {\n  const set = new Set();\n  for (const n of nums) {\n    if (set.has(n)) return true;\n    set.add(n);\n  }\n  return false;\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nrl.on('line', (line) => {\n  const nums = JSON.parse(line.trim());\n  console.log(containsDuplicate(nums) ? 'true' : 'false');\n  rl.close();\n});",
    "PYTHON": "import sys, json\n\nclass Solution:\n    def containsDuplicate(self, nums: list[int]) -> bool:\n        return len(nums) != len(set(nums))\n\nif __name__ == '__main__':\n    line = sys.stdin.readline().strip()\n    nums = json.loads(line)\n    sol = Solution()\n    print(str(sol.containsDuplicate(nums)).lower())",
    "JAVA": "import java.util.*;\n\npublic class Main {\n    public boolean containsDuplicate(int[] nums) {\n        Set<Integer> set = new HashSet<>();\n        for (int n : nums) {\n            if (!set.add(n)) return true;\n        }\n        return false;\n    }\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s = sc.nextLine().trim();\n        s = s.substring(1, s.length() - 1);\n        String[] parts = s.split(\",\");\n        int[] nums = new int[parts.length];\n        for (int i = 0; i < parts.length; i++) nums[i] = Integer.parseInt(parts[i].trim());\n        Main m = new Main();\n        System.out.println(m.containsDuplicate(nums) ? \"true\" : \"false\");\n    }\n}"
  }
};

export const problemSeed_4: ProblemSeed = {
  "title": "Valid Anagram",
  "description": "Given two strings s and t, return true if t is an anagram of s, and false otherwise. An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.",
  "difficulty": "EASY",
  "tags": [
    "Arrays & Hashing",
    "Hash Table",
    "String",
    "Sorting"
  ],
  "constraints": "1 <= s.length, t.length <= 5 * 10^4\ns and t consist of lowercase English letters.",
  "hints": "What happens if lengths of s and t are different? Can you count character frequencies of both strings?",
  "editorial": "Approach: Check if string lengths are identical first. Use a frequency array of size 26 to count letters in s and decrement for t. If all counts are zero, t is an anagram of s.\nTime Complexity: O(n)\nSpace Complexity: O(1)",
  "testCases": [
    {
      "input": "anagram\nnagaram",
      "output": "true"
    },
    {
      "input": "rat\ncar",
      "output": "false"
    },
    {
      "input": "a\nab",
      "output": "false"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "s = \"anagram\", t = \"nagaram\"",
      "output": "true",
      "explanation": "Both strings have the exact same count of each character."
    },
    "PYTHON": {
      "input": "s = \"anagram\", t = \"nagaram\"",
      "output": "true",
      "explanation": "Both strings have the exact same count of each character."
    },
    "JAVA": {
      "input": "s = \"anagram\", t = \"nagaram\"",
      "output": "true",
      "explanation": "Both strings have the exact same count of each character."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "/**\n * @param {string} s\n * @param {string} t\n * @return {boolean}\n */\nfunction isAnagram(s, t) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(isAnagram(lines[0], lines[1]) ? 'true' : 'false');\n});",
    "PYTHON": "import sys\n\nclass Solution:\n    def isAnagram(self, s: str, t: str) -> bool:\n        pass\n\nif __name__ == '__main__':\n    lines = [line.strip() for line in sys.stdin if line.strip()]\n    sol = Solution()\n    print(str(sol.isAnagram(lines[0], lines[1])).lower())",
    "JAVA": "import java.util.*;\n\npublic class Main {\n    public boolean isAnagram(String s, String t) {\n        return false;\n    }\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s = sc.nextLine().trim();\n        String t = sc.nextLine().trim();\n        Main m = new Main();\n        System.out.println(m.isAnagram(s, t) ? \"true\" : \"false\");\n    }\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function isAnagram(s, t) {\n  if (s.length !== t.length) return false;\n  const count = {};\n  for (let i = 0; i < s.length; i++) {\n    count[s[i]] = (count[s[i]] || 0) + 1;\n    count[t[i]] = (count[t[i]] || 0) - 1;\n  }\n  return Object.values(count).every(v => v === 0);\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(isAnagram(lines[0], lines[1]) ? 'true' : 'false');\n});",
    "PYTHON": "import sys\nfrom collections import Counter\n\nclass Solution:\n    def isAnagram(self, s: str, t: str) -> bool:\n        return Counter(s) == Counter(t)\n\nif __name__ == '__main__':\n    lines = [line.strip() for line in sys.stdin if line.strip()]\n    sol = Solution()\n    print(str(sol.isAnagram(lines[0], lines[1])).lower())",
    "JAVA": "import java.util.*;\n\npublic class Main {\n    public boolean isAnagram(String s, String t) {\n        if (s.length() != t.length()) return false;\n        int[] count = new int[26];\n        for (int i = 0; i < s.length(); i++) {\n            count[s.charAt(i) - 'a']++;\n            count[t.charAt(i) - 'a']--;\n        }\n        for (int c : count) if (c != 0) return false;\n        return true;\n    }\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s = sc.nextLine().trim();\n        String t = sc.nextLine().trim();\n        Main m = new Main();\n        System.out.println(m.isAnagram(s, t) ? \"true\" : \"false\");\n    }\n}"
  }
};

export const problemSeed_5: ProblemSeed = {
  "title": "Top K Frequent Elements",
  "description": "Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.",
  "difficulty": "MEDIUM",
  "tags": [
    "Arrays & Hashing",
    "Hash Table",
    "Heap",
    "Bucket Sort",
    "Counting"
  ],
  "constraints": "1 <= nums.length <= 10^5\n-10^4 <= nums[i] <= 10^4\nk is in the range [1, the number of unique elements in the array].\nIt is guaranteed that the answer is unique.",
  "hints": "Can you use bucket sort where the index of the bucket is the frequency of elements?",
  "editorial": "Approach: Count occurrences with a hash map. Then create buckets where bucket[freq] holds all elements with that frequency. Iterate from the highest frequency bucket down to collect the top k elements.\nTime Complexity: O(n)\nSpace Complexity: O(n)",
  "testCases": [
    {
      "input": "[1,1,1,2,2,3]\n2",
      "output": "[1,2]"
    },
    {
      "input": "[1]\n1",
      "output": "[1]"
    },
    {
      "input": "[4,1,-1,2,-1,2,3]\n2",
      "output": "[-1,2]"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "nums = [1,1,1,2,2,3], k = 2",
      "output": "[1,2]",
      "explanation": "1 has frequency 3, 2 has frequency 2. Top 2 are [1, 2]."
    },
    "PYTHON": {
      "input": "nums = [1,1,1,2,2,3], k = 2",
      "output": "[1,2]",
      "explanation": "1 has frequency 3, 2 has frequency 2. Top 2 are [1, 2]."
    },
    "JAVA": {
      "input": "nums = [1,1,1,2,2,3], k = 2",
      "output": "[1,2]",
      "explanation": "1 has frequency 3, 2 has frequency 2. Top 2 are [1, 2]."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "/**\n * @param {number[]} nums\n * @param {number} k\n * @return {number[]}\n */\nfunction topKFrequent(nums, k) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  const nums = JSON.parse(lines[0]);\n  const k = parseInt(lines[1], 10);\n  const res = topKFrequent(nums, k);\n  res.sort((a, b) => a - b);\n  console.log(JSON.stringify(res));\n});",
    "PYTHON": "import sys, json\n\nclass Solution:\n    def topKFrequent(self, nums: list[int], k: int) -> list[int]:\n        pass\n\nif __name__ == '__main__':\n    lines = [line.strip() for line in sys.stdin if line.strip()]\n    nums = json.loads(lines[0])\n    k = int(lines[1])\n    sol = Solution()\n    res = sol.topKFrequent(nums, k)\n    res.sort()\n    print(json.dumps(res))",
    "JAVA": "import java.util.*;\n\npublic class Main {\n    public int[] topKFrequent(int[] nums, int k) {\n        return new int[]{};\n    }\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // Parse input\n    }\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function topKFrequent(nums, k) {\n  const map = new Map();\n  for (const n of nums) map.set(n, (map.get(n) || 0) + 1);\n  const buckets = Array.from({ length: nums.length + 1 }, () => []);\n  for (const [n, count] of map) buckets[count].push(n);\n  const res = [];\n  for (let i = buckets.length - 1; i >= 0 && res.length < k; i--) {\n    for (const n of buckets[i]) {\n      res.push(n);\n      if (res.length === k) break;\n    }\n  }\n  return res;\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  const nums = JSON.parse(lines[0]);\n  const k = parseInt(lines[1], 10);\n  const res = topKFrequent(nums, k);\n  res.sort((a, b) => a - b);\n  console.log(JSON.stringify(res));\n});",
    "PYTHON": "import sys, json\nfrom collections import Counter\n\nclass Solution:\n    def topKFrequent(self, nums: list[int], k: int) -> list[int]:\n        count = Counter(nums)\n        buckets = [[] for _ in range(len(nums) + 1)]\n        for n, c in count.items():\n            buckets[c].append(n)\n        res = []\n        for i in range(len(buckets) - 1, 0, -1):\n            for n in buckets[i]:\n                res.append(n)\n                if len(res) == k:\n                    return res\n        return res\n\nif __name__ == '__main__':\n    lines = [line.strip() for line in sys.stdin if line.strip()]\n    nums = json.loads(lines[0])\n    k = int(lines[1])\n    sol = Solution()\n    res = sol.topKFrequent(nums, k)\n    res.sort()\n    print(json.dumps(res))",
    "JAVA": "import java.util.*;\n\npublic class Main {\n    public int[] topKFrequent(int[] nums, int k) {\n        Map<Integer, Integer> map = new HashMap<>();\n        for (int n : nums) map.put(n, map.getOrDefault(n, 0) + 1);\n        List<Integer>[] buckets = new List[nums.length + 1];\n        for (int key : map.keySet()) {\n            int freq = map.get(key);\n            if (buckets[freq] == null) buckets[freq] = new ArrayList<>();\n            buckets[freq].add(key);\n        }\n        int[] res = new int[k];\n        int idx = 0;\n        for (int i = buckets.length - 1; i >= 0 && idx < k; i--) {\n            if (buckets[i] != null) {\n                for (int n : buckets[i]) {\n                    res[idx++] = n;\n                    if (idx == k) break;\n                }\n            }\n        }\n        return res;\n    }\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n    }\n}"
  }
};

export const problemSeed_6: ProblemSeed = {
  "title": "Product of Array Except Self",
  "description": "Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i]. The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer. You must write an algorithm that runs in O(n) time and without using the division operation.",
  "difficulty": "MEDIUM",
  "tags": [
    "Arrays & Hashing",
    "Array",
    "Prefix Sum"
  ],
  "constraints": "2 <= nums.length <= 10^5\n-30 <= nums[i] <= 30\nThe product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.",
  "hints": "Can you solve it by computing prefix products and suffix products?",
  "editorial": "Approach: Compute prefix products in the result array from left to right. Then use a running suffix product variable from right to left, multiplying it into the result array.\nTime Complexity: O(n)\nSpace Complexity: O(1) auxiliary space (output array doesn't count towards space).",
  "testCases": [
    {
      "input": "[1,2,3,4]",
      "output": "[24,12,8,6]"
    },
    {
      "input": "[-1,1,0,-3,3]",
      "output": "[0,0,9,0,0]"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "nums = [1,2,3,4]",
      "output": "[24,12,8,6]",
      "explanation": "2*3*4=24, 1*3*4=12, 1*2*4=8, 1*2*3=6"
    },
    "PYTHON": {
      "input": "nums = [1,2,3,4]",
      "output": "[24,12,8,6]",
      "explanation": "2*3*4=24, 1*3*4=12, 1*2*4=8, 1*2*3=6"
    },
    "JAVA": {
      "input": "nums = [1,2,3,4]",
      "output": "[24,12,8,6]",
      "explanation": "2*3*4=24, 1*3*4=12, 1*2*4=8, 1*2*3=6"
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "/**\n * @param {number[]} nums\n * @return {number[]}\n */\nfunction productExceptSelf(nums) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nrl.on('line', (line) => {\n  const nums = JSON.parse(line.trim());\n  console.log(JSON.stringify(productExceptSelf(nums)));\n  rl.close();\n});",
    "PYTHON": "import sys, json\n\nclass Solution:\n    def productExceptSelf(self, nums: list[int]) -> list[int]:\n        pass\n\nif __name__ == '__main__':\n    line = sys.stdin.readline().strip()\n    nums = json.loads(line)\n    sol = Solution()\n    print(json.dumps(sol.productExceptSelf(nums)))",
    "JAVA": "import java.util.*;\n\npublic class Main {\n    public int[] productExceptSelf(int[] nums) {\n        return new int[]{};\n    }\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function productExceptSelf(nums) {\n  const n = nums.length;\n  const res = new Array(n).fill(1);\n  let prefix = 1;\n  for (let i = 0; i < n; i++) {\n    res[i] = prefix;\n    prefix *= nums[i];\n  }\n  let postfix = 1;\n  for (let i = n - 1; i >= 0; i--) {\n    res[i] *= postfix;\n    postfix *= nums[i];\n  }\n  return res;\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nrl.on('line', (line) => {\n  const nums = JSON.parse(line.trim());\n  console.log(JSON.stringify(productExceptSelf(nums)));\n  rl.close();\n});",
    "PYTHON": "import sys, json\n\nclass Solution:\n    def productExceptSelf(self, nums: list[int]) -> list[int]:\n        n = len(nums)\n        res = [1] * n\n        prefix = 1\n        for i in range(n):\n            res[i] = prefix\n            prefix *= nums[i]\n        postfix = 1\n        for i in range(n - 1, -1, -1):\n            res[i] *= postfix\n            postfix *= nums[i]\n        return res\n\nif __name__ == '__main__':\n    line = sys.stdin.readline().strip()\n    nums = json.loads(line)\n    sol = Solution()\n    print(json.dumps(sol.productExceptSelf(nums)))",
    "JAVA": "import java.util.*;\n\npublic class Main {\n    public int[] productExceptSelf(int[] nums) {\n        int n = nums.length;\n        int[] res = new int[n];\n        res[0] = 1;\n        for (int i = 1; i < n; i++) res[i] = res[i - 1] * nums[i - 1];\n        int right = 1;\n        for (int i = n - 1; i >= 0; i--) {\n            res[i] *= right;\n            right *= nums[i];\n        }\n        return res;\n    }\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_7: ProblemSeed = {
  "title": "Encode and Decode Strings",
  "description": "Design an algorithm to encode a list of strings to a single string. The encoded string is then sent over the network and is decoded back to the original list of strings.",
  "difficulty": "MEDIUM",
  "tags": [
    "Arrays & Hashing",
    "String",
    "Design"
  ],
  "constraints": "0 <= strs.length <= 200\n0 <= strs[i].length <= 200\nstrs[i] contains any possible characters out of 256 valid ASCII characters.",
  "hints": "How can you store the length of each string before its characters so you know exactly how many bytes to read?",
  "editorial": "Approach: Prefix each string with its length followed by a delimiter like '#'. For example, [\"lint\", \"code\"] encodes to \"4#lint4#code\". On decoding, read until '#' to get the integer length, then take that many characters.\nTime Complexity: O(n) for both encode and decode\nSpace Complexity: O(1) auxiliary",
  "testCases": [
    {
      "input": "[\"lint\",\"code\",\"love\",\"you\"]",
      "output": "[\"lint\",\"code\",\"love\",\"you\"]"
    },
    {
      "input": "[\"we\",\"say\",\":\",\"yes\"]",
      "output": "[\"we\",\"say\",\":\",\"yes\"]"
    },
    {
      "input": "[\"\"]",
      "output": "[\"\"]"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "strs = [\"lint\",\"code\",\"love\",\"you\"]",
      "output": "[\"lint\",\"code\",\"love\",\"you\"]",
      "explanation": "The strings are preserved identically after encode and decode."
    },
    "PYTHON": {
      "input": "strs = [\"lint\",\"code\",\"love\",\"you\"]",
      "output": "[\"lint\",\"code\",\"love\",\"you\"]",
      "explanation": "The strings are preserved identically after encode and decode."
    },
    "JAVA": {
      "input": "strs = [\"lint\",\"code\",\"love\",\"you\"]",
      "output": "[\"lint\",\"code\",\"love\",\"you\"]",
      "explanation": "The strings are preserved identically after encode and decode."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "function encode(strs) {\n  // Write encode logic\n}\n\nfunction decode(s) {\n  // Write decode logic\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nrl.on('line', (line) => {\n  const strs = JSON.parse(line.trim());\n  console.log(JSON.stringify(decode(encode(strs))));\n  rl.close();\n});",
    "PYTHON": "import sys, json\n\nclass Codec:\n    def encode(self, strs: list[str]) -> str:\n        pass\n    def decode(self, s: str) -> list[str]:\n        pass\n\nif __name__ == '__main__':\n    line = sys.stdin.readline().strip()\n    strs = json.loads(line)\n    codec = Codec()\n    print(json.dumps(codec.decode(codec.encode(strs))))",
    "JAVA": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function encode(strs) {\n  let res = '';\n  for (const s of strs) {\n    res += s.length + '#' + s;\n  }\n  return res;\n}\n\nfunction decode(s) {\n  const res = [];\n  let i = 0;\n  while (i < s.length) {\n    const j = s.indexOf('#', i);\n    const len = parseInt(s.slice(i, j), 10);\n    res.push(s.slice(j + 1, j + 1 + len));\n    i = j + 1 + len;\n  }\n  return res;\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nrl.on('line', (line) => {\n  const strs = JSON.parse(line.trim());\n  console.log(JSON.stringify(decode(encode(strs))));\n  rl.close();\n});",
    "PYTHON": "import sys, json\n\nclass Codec:\n    def encode(self, strs: list[str]) -> str:\n        res = ''\n        for s in strs:\n            res += str(len(s)) + '#' + s\n        return res\n\n    def decode(self, s: str) -> list[str]:\n        res, i = [], 0\n        while i < len(s):\n            j = s.find('#', i)\n            length = int(s[i:j])\n            res.append(s[j + 1 : j + 1 + length])\n            i = j + 1 + length\n        return res\n\nif __name__ == '__main__':\n    line = sys.stdin.readline().strip()\n    strs = json.loads(line)\n    codec = Codec()\n    print(json.dumps(codec.decode(codec.encode(strs))))",
    "JAVA": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_8: ProblemSeed = {
  "title": "Longest Consecutive Sequence",
  "description": "Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence. You must write an algorithm that runs in O(n) time.",
  "difficulty": "MEDIUM",
  "tags": [
    "Arrays & Hashing",
    "Array",
    "Hash Table",
    "Union Find"
  ],
  "constraints": "0 <= nums.length <= 10^5\n-10^9 <= nums[i] <= 10^9",
  "hints": "Insert all numbers into a HashSet. How can you tell if a number is the start of a consecutive sequence?",
  "editorial": "Approach: Place all numbers in a HashSet. For each number n, check if n - 1 exists in the set. If not, n is the start of a sequence! Count consecutive numbers (n + 1, n + 2, ...) and update max length.\nTime Complexity: O(n)\nSpace Complexity: O(n)",
  "testCases": [
    {
      "input": "[100,4,200,1,3,2]",
      "output": "4"
    },
    {
      "input": "[0,3,7,2,5,8,4,6,0,1]",
      "output": "9"
    },
    {
      "input": "[]",
      "output": "0"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "nums = [100,4,200,1,3,2]",
      "output": "4",
      "explanation": "The longest consecutive sequence is [1, 2, 3, 4], length = 4."
    },
    "PYTHON": {
      "input": "nums = [100,4,200,1,3,2]",
      "output": "4",
      "explanation": "The longest consecutive sequence is [1, 2, 3, 4], length = 4."
    },
    "JAVA": {
      "input": "nums = [100,4,200,1,3,2]",
      "output": "4",
      "explanation": "The longest consecutive sequence is [1, 2, 3, 4], length = 4."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "/**\n * @param {number[]} nums\n * @return {number}\n */\nfunction longestConsecutive(nums) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nrl.on('line', (line) => {\n  const nums = JSON.parse(line.trim());\n  console.log(longestConsecutive(nums));\n  rl.close();\n});",
    "PYTHON": "import sys, json\n\nclass Solution:\n    def longestConsecutive(self, nums: list[int]) -> int:\n        pass\n\nif __name__ == '__main__':\n    line = sys.stdin.readline().strip()\n    nums = json.loads(line)\n    sol = Solution()\n    print(sol.longestConsecutive(nums))",
    "JAVA": "import java.util.*;\n\npublic class Main {\n    public int longestConsecutive(int[] nums) {\n        return 0;\n    }\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function longestConsecutive(nums) {\n  const set = new Set(nums);\n  let longest = 0;\n  for (const n of set) {\n    if (!set.has(n - 1)) {\n      let length = 1;\n      while (set.has(n + length)) {\n        length++;\n      }\n      longest = Math.max(longest, length);\n    }\n  }\n  return longest;\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nrl.on('line', (line) => {\n  const nums = JSON.parse(line.trim());\n  console.log(longestConsecutive(nums));\n  rl.close();\n});",
    "PYTHON": "import sys, json\n\nclass Solution:\n    def longestConsecutive(self, nums: list[int]) -> int:\n        num_set = set(nums)\n        longest = 0\n        for n in num_set:\n            if (n - 1) not in num_set:\n                length = 1\n                while (n + length) in num_set:\n                    length += 1\n                longest = max(longest, length)\n        return longest\n\nif __name__ == '__main__':\n    line = sys.stdin.readline().strip()\n    nums = json.loads(line)\n    sol = Solution()\n    print(sol.longestConsecutive(nums))",
    "JAVA": "import java.util.*;\n\npublic class Main {\n    public int longestConsecutive(int[] nums) {\n        Set<Integer> set = new HashSet<>();\n        for (int n : nums) set.add(n);\n        int longest = 0;\n        for (int n : set) {\n            if (!set.contains(n - 1)) {\n                int length = 1;\n                while (set.contains(n + length)) length++;\n                longest = Math.max(longest, length);\n            }\n        }\n        return longest;\n    }\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_9: ProblemSeed = {
  "title": "Valid Sudoku",
  "description": "Determine if a 9 x 9 Sudoku board is valid. Only the filled cells need to be validated according to the following rules:\n1. Each row must contain the digits 1-9 without repetition.\n2. Each column must contain the digits 1-9 without repetition.\n3. Each of the nine 3 x 3 sub-boxes of the grid must contain the digits 1-9 without repetition.\nNote: A Sudoku board (partially filled) could be valid but is not necessarily solvable.",
  "difficulty": "MEDIUM",
  "tags": [
    "Arrays & Hashing",
    "Array",
    "Hash Table",
    "Matrix"
  ],
  "constraints": "board.length == 9\nboard[i].length == 9\nboard[i][j] is a digit '1'-'9' or '.'.",
  "hints": "Can you maintain hash sets for each row, column, and 3x3 block?",
  "editorial": "Approach: Iterate through each of the 81 cells. For any cell with a digit, verify that it has not been seen in the corresponding row set, column set, or 3x3 box set (indexed by Math.floor(r/3)*3 + Math.floor(c/3)).\nTime Complexity: O(1) (fixed 9x9 board)\nSpace Complexity: O(1)",
  "testCases": [
    {
      "input": "[[\"5\",\"3\",\".\",\".\",\"7\",\".\",\".\",\".\",\".\"],[\"6\",\".\",\".\",\"1\",\"9\",\"5\",\".\",\".\",\".\"],[\".\",\"9\",\"8\",\".\",\".\",\".\",\".\",\"6\",\".\"],[\"8\",\".\",\".\",\".\",\"6\",\".\",\".\",\".\",\"3\"],[\"4\",\".\",\".\",\"8\",\".\",\"3\",\".\",\".\",\"1\"],[\"7\",\".\",\".\",\".\",\"2\",\".\",\".\",\".\",\"6\"],[\".\",\"6\",\".\",\".\",\".\",\".\",\"2\",\"8\",\".\"],[\".\",\".\",\".\",\"4\",\"1\",\"9\",\".\",\".\",\"5\"],[\".\",\".\",\".\",\".\",\"8\",\".\",\".\",\"7\",\"9\"]]",
      "output": "true"
    },
    {
      "input": "[[\"8\",\"3\",\".\",\".\",\"7\",\".\",\".\",\".\",\".\"],[\"6\",\".\",\".\",\"1\",\"9\",\"5\",\".\",\".\",\".\"],[\".\",\"9\",\"8\",\".\",\".\",\".\",\".\",\"6\",\".\"],[\"8\",\".\",\".\",\".\",\"6\",\".\",\".\",\".\",\"3\"],[\"4\",\".\",\".\",\"8\",\".\",\"3\",\".\",\".\",\"1\"],[\"7\",\".\",\".\",\".\",\"2\",\".\",\".\",\".\",\"6\"],[\".\",\"6\",\".\",\".\",\".\",\".\",\"2\",\"8\",\".\"],[\".\",\".\",\".\",\"4\",\"1\",\"9\",\".\",\".\",\"5\"],[\".\",\".\",\".\",\".\",\"8\",\".\",\".\",\"7\",\"9\"]]",
      "output": "false"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "board = [[\"5\",\"3\",...]]",
      "output": "true",
      "explanation": "Each row, column, and 3x3 box contains unique digits."
    },
    "PYTHON": {
      "input": "board = [[\"5\",\"3\",...]]",
      "output": "true",
      "explanation": "Each row, column, and 3x3 box contains unique digits."
    },
    "JAVA": {
      "input": "board = [[\"5\",\"3\",...]]",
      "output": "true",
      "explanation": "Each row, column, and 3x3 box contains unique digits."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "/**\n * @param {character[][]} board\n * @return {boolean}\n */\nfunction isValidSudoku(board) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nrl.on('line', (line) => {\n  const board = JSON.parse(line.trim());\n  console.log(isValidSudoku(board) ? 'true' : 'false');\n  rl.close();\n});",
    "PYTHON": "import sys, json\n\nclass Solution:\n    def isValidSudoku(self, board: list[list[str]]) -> bool:\n        pass\n\nif __name__ == '__main__':\n    line = sys.stdin.readline().strip()\n    board = json.loads(line)\n    sol = Solution()\n    print(str(sol.isValidSudoku(board)).lower())",
    "JAVA": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function isValidSudoku(board) {\n  const rows = Array.from({ length: 9 }, () => new Set());\n  const cols = Array.from({ length: 9 }, () => new Set());\n  const boxes = Array.from({ length: 9 }, () => new Set());\n  for (let r = 0; r < 9; r++) {\n    for (let c = 0; c < 9; c++) {\n      const val = board[r][c];\n      if (val === '.') continue;\n      const boxIdx = Math.floor(r / 3) * 3 + Math.floor(c / 3);\n      if (rows[r].has(val) || cols[c].has(val) || boxes[boxIdx].has(val)) return false;\n      rows[r].add(val);\n      cols[c].add(val);\n      boxes[boxIdx].add(val);\n    }\n  }\n  return true;\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nrl.on('line', (line) => {\n  const board = JSON.parse(line.trim());\n  console.log(isValidSudoku(board) ? 'true' : 'false');\n  rl.close();\n});",
    "PYTHON": "import sys, json\n\nclass Solution:\n    def isValidSudoku(self, board: list[list[str]]) -> bool:\n        rows = [set() for _ in range(9)]\n        cols = [set() for _ in range(9)]\n        boxes = [set() for _ in range(9)]\n        for r in range(9):\n            for c in range(9):\n                val = board[r][c]\n                if val == '.':\n                    continue\n                box_idx = (r // 3) * 3 + (c // 3)\n                if val in rows[r] or val in cols[c] or val in boxes[box_idx]:\n                    return False\n                rows[r].add(val)\n                cols[c].add(val)\n                boxes[box_idx].add(val)\n        return True\n\nif __name__ == '__main__':\n    line = sys.stdin.readline().strip()\n    board = json.loads(line)\n    sol = Solution()\n    print(str(sol.isValidSudoku(board)).lower())",
    "JAVA": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_10: ProblemSeed = {
  "title": "Two Sum II - Input Array Is Sorted",
  "description": "Given a 1-indexed array of integers numbers that is already sorted in non-decreasing order, find two numbers such that they add up to a specific target number. Return the indices of the two numbers, index1 and index2, added by one as an integer array [index1, index2] of length 2.",
  "difficulty": "MEDIUM",
  "tags": [
    "Two Pointers",
    "Array",
    "Binary Search"
  ],
  "constraints": "2 <= numbers.length <= 3 * 10^4\n-1000 <= numbers[i] <= 1000\nnumbers is sorted in non-decreasing order.\n-1000 <= target <= 1000\nThe tests are generated such that there is exactly one solution.",
  "hints": "Since the array is sorted, can you maintain two pointers at both ends and adjust them based on whether their sum is smaller or larger than target?",
  "editorial": "Approach: Initialize left at 0 and right at numbers.length - 1. While left < right, if numbers[left] + numbers[right] === target, return [left + 1, right + 1]. If sum < target, increment left; otherwise decrement right.\nTime Complexity: O(n)\nSpace Complexity: O(1)",
  "testCases": [
    {
      "input": "[2,7,11,15]\n9",
      "output": "[1,2]"
    },
    {
      "input": "[2,3,4]\n6",
      "output": "[1,3]"
    },
    {
      "input": "[-1,0]\n-1",
      "output": "[1,2]"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "numbers = [2,7,11,15], target = 9",
      "output": "[1,2]",
      "explanation": "The sum of 2 and 7 is 9. Therefore, index1 = 1, index2 = 2."
    },
    "PYTHON": {
      "input": "numbers = [2,7,11,15], target = 9",
      "output": "[1,2]",
      "explanation": "The sum of 2 and 7 is 9. Therefore, index1 = 1, index2 = 2."
    },
    "JAVA": {
      "input": "numbers = [2,7,11,15], target = 9",
      "output": "[1,2]",
      "explanation": "The sum of 2 and 7 is 9. Therefore, index1 = 1, index2 = 2."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "function twoSum(numbers, target) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  const numbers = JSON.parse(lines[0]);\n  const target = parseInt(lines[1], 10);\n  console.log(JSON.stringify(twoSum(numbers, target)));\n});",
    "PYTHON": "import sys, json\n\nclass Solution:\n    def twoSum(self, numbers: list[int], target: int) -> list[int]:\n        pass\n\nif __name__ == '__main__':\n    lines = [line.strip() for line in sys.stdin if line.strip()]\n    numbers = json.loads(lines[0])\n    target = int(lines[1])\n    sol = Solution()\n    print(json.dumps(sol.twoSum(numbers, target)))",
    "JAVA": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function twoSum(numbers, target) {\n  let l = 0, r = numbers.length - 1;\n  while (l < r) {\n    const sum = numbers[l] + numbers[r];\n    if (sum === target) return [l + 1, r + 1];\n    if (sum < target) l++;\n    else r--;\n  }\n  return [];\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  const numbers = JSON.parse(lines[0]);\n  const target = parseInt(lines[1], 10);\n  console.log(JSON.stringify(twoSum(numbers, target)));\n});",
    "PYTHON": "import sys, json\n\nclass Solution:\n    def twoSum(self, numbers: list[int], target: int) -> list[int]:\n        l, r = 0, len(numbers) - 1\n        while l < r:\n            s = numbers[l] + numbers[r]\n            if s == target:\n                return [l + 1, r + 1]\n            elif s < target:\n                l += 1\n            else:\n                r -= 1\n        return []\n\nif __name__ == '__main__':\n    lines = [line.strip() for line in sys.stdin if line.strip()]\n    numbers = json.loads(lines[0])\n    target = int(lines[1])\n    sol = Solution()\n    print(json.dumps(sol.twoSum(numbers, target)))",
    "JAVA": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_11: ProblemSeed = {
  "title": "3Sum",
  "description": "Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0. Notice that the solution set must not contain duplicate triplets.",
  "difficulty": "MEDIUM",
  "tags": [
    "Two Pointers",
    "Array",
    "Sorting"
  ],
  "constraints": "3 <= nums.length <= 3000\n-10^5 <= nums[i] <= 10^5",
  "hints": "Sort the array first. For each number nums[i], can you use two pointers to find two other numbers that sum to -nums[i]?",
  "editorial": "Approach: Sort nums. For each index i, if nums[i] > 0 break. If i > 0 and nums[i] === nums[i-1], skip duplicates. Use two pointers left = i+1 and right = n-1 to find pairs summing to -nums[i]. Skip duplicate values on both pointers.\nTime Complexity: O(n^2)\nSpace Complexity: O(1) or O(n) depending on sort implementation.",
  "testCases": [
    {
      "input": "[-1,0,1,2,-1,-4]",
      "output": "[[-1,-1,2],[-1,0,1]]"
    },
    {
      "input": "[0,1,1]",
      "output": "[]"
    },
    {
      "input": "[0,0,0]",
      "output": "[[0,0,0]]"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "nums = [-1,0,1,2,-1,-4]",
      "output": "[[-1,-1,2],[-1,0,1]]",
      "explanation": "Distinct triplets that sum up to 0 are [-1, 0, 1] and [-1, -1, 2]."
    },
    "PYTHON": {
      "input": "nums = [-1,0,1,2,-1,-4]",
      "output": "[[-1,-1,2],[-1,0,1]]",
      "explanation": "Distinct triplets that sum up to 0 are [-1, 0, 1] and [-1, -1, 2]."
    },
    "JAVA": {
      "input": "nums = [-1,0,1,2,-1,-4]",
      "output": "[[-1,-1,2],[-1,0,1]]",
      "explanation": "Distinct triplets that sum up to 0 are [-1, 0, 1] and [-1, -1, 2]."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "function threeSum(nums) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nrl.on('line', (line) => {\n  const nums = JSON.parse(line.trim());\n  console.log(JSON.stringify(threeSum(nums)));\n  rl.close();\n});",
    "PYTHON": "import sys, json\n\nclass Solution:\n    def threeSum(self, nums: list[int]) -> list[list[int]]:\n        pass\n\nif __name__ == '__main__':\n    nums = json.loads(sys.stdin.readline().strip())\n    sol = Solution()\n    print(json.dumps(sol.threeSum(nums)))",
    "JAVA": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function threeSum(nums) {\n  nums.sort((a, b) => a - b);\n  const res = [];\n  for (let i = 0; i < nums.length - 2; i++) {\n    if (nums[i] > 0) break;\n    if (i > 0 && nums[i] === nums[i - 1]) continue;\n    let l = i + 1, r = nums.length - 1;\n    while (l < r) {\n      const sum = nums[i] + nums[l] + nums[r];\n      if (sum === 0) {\n        res.push([nums[i], nums[l], nums[r]]);\n        while (l < r && nums[l] === nums[l + 1]) l++;\n        while (l < r && nums[r] === nums[r - 1]) r--;\n        l++;\n        r--;\n      } else if (sum < 0) {\n        l++;\n      } else {\n        r--;\n      }\n    }\n  }\n  return res;\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nrl.on('line', (line) => {\n  const nums = JSON.parse(line.trim());\n  console.log(JSON.stringify(threeSum(nums)));\n  rl.close();\n});",
    "PYTHON": "import sys, json\n\nclass Solution:\n    def threeSum(self, nums: list[int]) -> list[list[int]]:\n        nums.sort()\n        res = []\n        for i in range(len(nums) - 2):\n            if nums[i] > 0:\n                break\n            if i > 0 and nums[i] == nums[i - 1]:\n                continue\n            l, r = i + 1, len(nums) - 1\n            while l < r:\n                s = nums[i] + nums[l] + nums[r]\n                if s == 0:\n                    res.append([nums[i], nums[l], nums[r]])\n                    while l < r and nums[l] == nums[l + 1]:\n                        l += 1\n                    while l < r and nums[r] == nums[r - 1]:\n                        r -= 1\n                    l += 1\n                    r -= 1\n                elif s < 0:\n                    l += 1\n                else:\n                    r -= 1\n        return res\n\nif __name__ == '__main__':\n    nums = json.loads(sys.stdin.readline().strip())\n    sol = Solution()\n    print(json.dumps(sol.threeSum(nums)))",
    "JAVA": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_12: ProblemSeed = {
  "title": "Container With Most Water",
  "description": "You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]). Find two lines that together with the x-axis form a container, such that the container contains the most water. Return the maximum amount of water a container can store.",
  "difficulty": "MEDIUM",
  "tags": [
    "Two Pointers",
    "Array",
    "Greedy"
  ],
  "constraints": "n == height.length\n2 <= n <= 10^5\n0 <= height[i] <= 10^4",
  "hints": "Start with the widest container using pointers at the left and right ends. Which pointer should you move inward?",
  "editorial": "Approach: Start with l = 0, r = n - 1. Area = (r - l) * min(height[l], height[r]). To potentially find a larger container, always move the pointer pointing to the shorter line inward.\nTime Complexity: O(n)\nSpace Complexity: O(1)",
  "testCases": [
    {
      "input": "[1,8,6,2,5,4,8,3,7]",
      "output": "49"
    },
    {
      "input": "[1,1]",
      "output": "1"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "height = [1,8,6,2,5,4,8,3,7]",
      "output": "49",
      "explanation": "The max area is between index 1 and 8: min(8, 7) * (8 - 1) = 7 * 7 = 49."
    },
    "PYTHON": {
      "input": "height = [1,8,6,2,5,4,8,3,7]",
      "output": "49",
      "explanation": "The max area is between index 1 and 8: min(8, 7) * (8 - 1) = 7 * 7 = 49."
    },
    "JAVA": {
      "input": "height = [1,8,6,2,5,4,8,3,7]",
      "output": "49",
      "explanation": "The max area is between index 1 and 8: min(8, 7) * (8 - 1) = 7 * 7 = 49."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "function maxArea(height) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nrl.on('line', (line) => {\n  const height = JSON.parse(line.trim());\n  console.log(maxArea(height));\n  rl.close();\n});",
    "PYTHON": "import sys, json\n\nclass Solution:\n    def maxArea(self, height: list[int]) -> int:\n        pass\n\nif __name__ == '__main__':\n    height = json.loads(sys.stdin.readline().strip())\n    sol = Solution()\n    print(sol.maxArea(height))",
    "JAVA": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function maxArea(height) {\n  let l = 0, r = height.length - 1;\n  let maxWater = 0;\n  while (l < r) {\n    const h = Math.min(height[l], height[r]);\n    maxWater = Math.max(maxWater, h * (r - l));\n    if (height[l] < height[r]) l++;\n    else r--;\n  }\n  return maxWater;\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nrl.on('line', (line) => {\n  const height = JSON.parse(line.trim());\n  console.log(maxArea(height));\n  rl.close();\n});",
    "PYTHON": "import sys, json\n\nclass Solution:\n    def maxArea(self, height: list[int]) -> int:\n        l, r = 0, len(height) - 1\n        max_water = 0\n        while l < r:\n            h = min(height[l], height[r])\n            max_water = max(max_water, h * (r - l))\n            if height[l] < height[r]:\n                l += 1\n            else:\n                r -= 1\n        return max_water\n\nif __name__ == '__main__':\n    height = json.loads(sys.stdin.readline().strip())\n    sol = Solution()\n    print(sol.maxArea(height))",
    "JAVA": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_13: ProblemSeed = {
  "title": "Trapping Rain Water",
  "description": "Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.",
  "difficulty": "HARD",
  "tags": [
    "Two Pointers",
    "Array",
    "Dynamic Programming",
    "Stack"
  ],
  "constraints": "n == height.length\n1 <= n <= 2 * 10^4\n0 <= height[i] <= 10^5",
  "hints": "The water above any bar is determined by min(max_left, max_right) - height[i]. Can you maintain max_left and max_right using two pointers?",
  "editorial": "Approach: Use two pointers l = 0, r = n - 1 with leftMax and rightMax tracking the highest bars seen so far. If leftMax < rightMax, the trapped water at l is leftMax - height[l], and advance l. Otherwise process r.\nTime Complexity: O(n)\nSpace Complexity: O(1)",
  "testCases": [
    {
      "input": "[0,1,0,2,1,0,1,3,2,1,2,1]",
      "output": "6"
    },
    {
      "input": "[4,2,0,3,2,5]",
      "output": "9"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "height = [0,1,0,2,1,0,1,3,2,1,2,1]",
      "output": "6",
      "explanation": "Total 6 units of rain water are trapped."
    },
    "PYTHON": {
      "input": "height = [0,1,0,2,1,0,1,3,2,1,2,1]",
      "output": "6",
      "explanation": "Total 6 units of rain water are trapped."
    },
    "JAVA": {
      "input": "height = [0,1,0,2,1,0,1,3,2,1,2,1]",
      "output": "6",
      "explanation": "Total 6 units of rain water are trapped."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "function trap(height) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nrl.on('line', (line) => {\n  const height = JSON.parse(line.trim());\n  console.log(trap(height));\n  rl.close();\n});",
    "PYTHON": "import sys, json\n\nclass Solution:\n    def trap(self, height: list[int]) -> int:\n        pass\n\nif __name__ == '__main__':\n    height = json.loads(sys.stdin.readline().strip())\n    sol = Solution()\n    print(sol.trap(height))",
    "JAVA": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function trap(height) {\n  let l = 0, r = height.length - 1;\n  let leftMax = 0, rightMax = 0;\n  let res = 0;\n  while (l < r) {\n    if (height[l] < height[r]) {\n      if (height[l] >= leftMax) leftMax = height[l];\n      else res += leftMax - height[l];\n      l++;\n    } else {\n      if (height[r] >= rightMax) rightMax = height[r];\n      else res += rightMax - height[r];\n      r--;\n    }\n  }\n  return res;\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nrl.on('line', (line) => {\n  const height = JSON.parse(line.trim());\n  console.log(trap(height));\n  rl.close();\n});",
    "PYTHON": "import sys, json\n\nclass Solution:\n    def trap(self, height: list[int]) -> int:\n        l, r = 0, len(height) - 1\n        left_max, right_max = 0, 0\n        res = 0\n        while l < r:\n            if height[l] < height[r]:\n                if height[l] >= left_max:\n                    left_max = height[l]\n                else:\n                    res += left_max - height[l]\n                l += 1\n            else:\n                if height[r] >= right_max:\n                    right_max = height[r]\n                else:\n                    res += right_max - height[r]\n                r -= 1\n        return res\n\nif __name__ == '__main__':\n    height = json.loads(sys.stdin.readline().strip())\n    sol = Solution()\n    print(sol.trap(height))",
    "JAVA": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_14: ProblemSeed = {
  "title": "Best Time to Buy and Sell Stock",
  "description": "You are given an array prices where prices[i] is the price of a given stock on the ith day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock. Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.",
  "difficulty": "EASY",
  "tags": [
    "Sliding Window",
    "Array",
    "Dynamic Programming"
  ],
  "constraints": "1 <= prices.length <= 10^5\n0 <= prices[i] <= 10^4",
  "hints": "Track the minimum price seen so far as you iterate through the array.",
  "editorial": "Approach: Maintain minPrice = infinity and maxProfit = 0. For each price, update minPrice = min(minPrice, price) and maxProfit = max(maxProfit, price - minPrice).\nTime Complexity: O(n)\nSpace Complexity: O(1)",
  "testCases": [
    {
      "input": "[7,1,5,3,6,4]",
      "output": "5"
    },
    {
      "input": "[7,6,4,3,1]",
      "output": "0"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "prices = [7,1,5,3,6,4]",
      "output": "5",
      "explanation": "Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5."
    },
    "PYTHON": {
      "input": "prices = [7,1,5,3,6,4]",
      "output": "5",
      "explanation": "Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5."
    },
    "JAVA": {
      "input": "prices = [7,1,5,3,6,4]",
      "output": "5",
      "explanation": "Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "function maxProfit(prices) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nrl.on('line', (line) => {\n  const prices = JSON.parse(line.trim());\n  console.log(maxProfit(prices));\n  rl.close();\n});",
    "PYTHON": "import sys, json\n\nclass Solution:\n    def maxProfit(self, prices: list[int]) -> int:\n        pass\n\nif __name__ == '__main__':\n    prices = json.loads(sys.stdin.readline().strip())\n    sol = Solution()\n    print(sol.maxProfit(prices))",
    "JAVA": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function maxProfit(prices) {\n  let minPrice = Infinity;\n  let maxProfit = 0;\n  for (const p of prices) {\n    if (p < minPrice) minPrice = p;\n    else if (p - minPrice > maxProfit) maxProfit = p - minPrice;\n  }\n  return maxProfit;\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nrl.on('line', (line) => {\n  const prices = JSON.parse(line.trim());\n  console.log(maxProfit(prices));\n  rl.close();\n});",
    "PYTHON": "import sys, json\n\nclass Solution:\n    def maxProfit(self, prices: list[int]) -> int:\n        min_price = float('inf')\n        max_profit = 0\n        for p in prices:\n            if p < min_price:\n                min_price = p\n            elif p - min_price > max_profit:\n                max_profit = p - min_price\n        return max_profit\n\nif __name__ == '__main__':\n    prices = json.loads(sys.stdin.readline().strip())\n    sol = Solution()\n    print(sol.maxProfit(prices))",
    "JAVA": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_15: ProblemSeed = {
  "title": "Longest Substring Without Repeating Characters",
  "description": "Given a string s, find the length of the longest substring without repeating characters.",
  "difficulty": "MEDIUM",
  "tags": [
    "Sliding Window",
    "Hash Table",
    "String"
  ],
  "constraints": "0 <= s.length <= 5 * 10^4\ns consists of English letters, digits, symbols and spaces.",
  "hints": "Use a sliding window with a set or hash map storing the latest index of each character.",
  "editorial": "Approach: Maintain window [left, right] with a map storing the latest index of each character. When s[right] was seen at or after left, advance left = map.get(s[right]) + 1. Update max length.\nTime Complexity: O(n)\nSpace Complexity: O(min(m, n)) where m is character set size.",
  "testCases": [
    {
      "input": "abcabcbb",
      "output": "3"
    },
    {
      "input": "bbbbb",
      "output": "1"
    },
    {
      "input": "pwwkew",
      "output": "3"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "s = \"abcabcbb\"",
      "output": "3",
      "explanation": "The answer is \"abc\", with the length of 3."
    },
    "PYTHON": {
      "input": "s = \"abcabcbb\"",
      "output": "3",
      "explanation": "The answer is \"abc\", with the length of 3."
    },
    "JAVA": {
      "input": "s = \"abcabcbb\"",
      "output": "3",
      "explanation": "The answer is \"abc\", with the length of 3."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "function lengthOfLongestSubstring(s) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nrl.on('line', (line) => {\n  console.log(lengthOfLongestSubstring(line));\n  rl.close();\n});",
    "PYTHON": "import sys\n\nclass Solution:\n    def lengthOfLongestSubstring(self, s: str) -> int:\n        pass\n\nif __name__ == '__main__':\n    s = sys.stdin.readline().rstrip('\\r\\n')\n    sol = Solution()\n    print(sol.lengthOfLongestSubstring(s))",
    "JAVA": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function lengthOfLongestSubstring(s) {\n  const map = new Map();\n  let left = 0, maxLen = 0;\n  for (let right = 0; right < s.length; right++) {\n    if (map.has(s[right]) && map.get(s[right]) >= left) {\n      left = map.get(s[right]) + 1;\n    }\n    map.set(s[right], right);\n    maxLen = Math.max(maxLen, right - left + 1);\n  }\n  return maxLen;\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nrl.on('line', (line) => {\n  console.log(lengthOfLongestSubstring(line));\n  rl.close();\n});",
    "PYTHON": "import sys\n\nclass Solution:\n    def lengthOfLongestSubstring(self, s: str) -> int:\n        seen = {}\n        l = 0\n        max_len = 0\n        for r, c in enumerate(s):\n            if c in seen and seen[c] >= l:\n                l = seen[c] + 1\n            seen[c] = r\n            max_len = max(max_len, r - l + 1)\n        return max_len\n\nif __name__ == '__main__':\n    s = sys.stdin.readline().rstrip('\\r\\n')\n    sol = Solution()\n    print(sol.lengthOfLongestSubstring(s))",
    "JAVA": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_16: ProblemSeed = {
  "title": "Longest Repeating Character Replacement",
  "description": "You are given a string s and an integer k. You can choose any character of the string and change it to any other uppercase English character. You can perform this operation at most k times. Return the length of the longest substring containing the same letter you can get after performing the above operations.",
  "difficulty": "MEDIUM",
  "tags": [
    "Sliding Window",
    "Hash Table",
    "String"
  ],
  "constraints": "1 <= s.length <= 10^5\ns consists of only uppercase English letters.\n0 <= k <= s.length",
  "hints": "The window is valid if (window length - count of most frequent character) <= k.",
  "editorial": "Approach: Use sliding window [l, r]. Keep count of characters and track maxFrequency. If (r - l + 1) - maxFrequency > k, shrink window by incrementing l.\nTime Complexity: O(n)\nSpace Complexity: O(26) = O(1)",
  "testCases": [
    {
      "input": "ABAB\n2",
      "output": "4"
    },
    {
      "input": "AABABBA\n1",
      "output": "4"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "s = \"ABAB\", k = 2",
      "output": "4",
      "explanation": "Replace the two 'A's with two 'B's or vice versa to get \"BBBB\" or \"AAAA\"."
    },
    "PYTHON": {
      "input": "s = \"ABAB\", k = 2",
      "output": "4",
      "explanation": "Replace the two 'A's with two 'B's or vice versa to get \"BBBB\" or \"AAAA\"."
    },
    "JAVA": {
      "input": "s = \"ABAB\", k = 2",
      "output": "4",
      "explanation": "Replace the two 'A's with two 'B's or vice versa to get \"BBBB\" or \"AAAA\"."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "function characterReplacement(s, k) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(characterReplacement(lines[0], parseInt(lines[1], 10)));\n});",
    "PYTHON": "import sys\n\nclass Solution:\n    def characterReplacement(self, s: str, k: int) -> int:\n        pass\n\nif __name__ == '__main__':\n    lines = [line.strip() for line in sys.stdin if line.strip()]\n    sol = Solution()\n    print(sol.characterReplacement(lines[0], int(lines[1])))",
    "JAVA": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function characterReplacement(s, k) {\n  const count = {};\n  let l = 0, maxFreq = 0, maxLen = 0;\n  for (let r = 0; r < s.length; r++) {\n    count[s[r]] = (count[s[r]] || 0) + 1;\n    maxFreq = Math.max(maxFreq, count[s[r]]);\n    while ((r - l + 1) - maxFreq > k) {\n      count[s[l]]--;\n      l++;\n    }\n    maxLen = Math.max(maxLen, r - l + 1);\n  }\n  return maxLen;\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(characterReplacement(lines[0], parseInt(lines[1], 10)));\n});",
    "PYTHON": "import sys\nfrom collections import defaultdict\n\nclass Solution:\n    def characterReplacement(self, s: str, k: int) -> int:\n        count = defaultdict(int)\n        l = 0\n        max_freq = 0\n        max_len = 0\n        for r, c in enumerate(s):\n            count[c] += 1\n            max_freq = max(max_freq, count[c])\n            while (r - l + 1) - max_freq > k:\n                count[s[l]] -= 1\n                l += 1\n            max_len = max(max_len, r - l + 1)\n        return max_len\n\nif __name__ == '__main__':\n    lines = [line.strip() for line in sys.stdin if line.strip()]\n    sol = Solution()\n    print(sol.characterReplacement(lines[0], int(lines[1])))",
    "JAVA": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_17: ProblemSeed = {
  "title": "Permutation in String",
  "description": "Given two strings s1 and s2, return true if s2 contains a permutation of s1, or false otherwise. In other words, return true if one of s1's permutations is the substring of s2.",
  "difficulty": "MEDIUM",
  "tags": [
    "Sliding Window",
    "Hash Table",
    "Two Pointers",
    "String"
  ],
  "constraints": "1 <= s1.length, s2.length <= 10^4\ns1 and s2 consist of lowercase English letters.",
  "hints": "Maintain a sliding window in s2 of length equal to s1.length and compare character counts.",
  "editorial": "Approach: Count characters of s1 in array count1 of size 26. Maintain a sliding window in s2 of size s1.length, updating count2. When count1 matches count2, return true.\nTime Complexity: O(n)\nSpace Complexity: O(1)",
  "testCases": [
    {
      "input": "ab\neidbaooo",
      "output": "true"
    },
    {
      "input": "ab\neidboaoo",
      "output": "false"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "s1 = \"ab\", s2 = \"eidbaooo\"",
      "output": "true",
      "explanation": "s2 contains one permutation of s1 (\"ba\")."
    },
    "PYTHON": {
      "input": "s1 = \"ab\", s2 = \"eidbaooo\"",
      "output": "true",
      "explanation": "s2 contains one permutation of s1 (\"ba\")."
    },
    "JAVA": {
      "input": "s1 = \"ab\", s2 = \"eidbaooo\"",
      "output": "true",
      "explanation": "s2 contains one permutation of s1 (\"ba\")."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "function checkInclusion(s1, s2) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(checkInclusion(lines[0], lines[1]) ? 'true' : 'false');\n});",
    "PYTHON": "import sys\n\nclass Solution:\n    def checkInclusion(self, s1: str, s2: str) -> bool:\n        pass\n\nif __name__ == '__main__':\n    lines = [line.strip() for line in sys.stdin if line.strip()]\n    sol = Solution()\n    print(str(sol.checkInclusion(lines[0], lines[1])).lower())",
    "JAVA": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function checkInclusion(s1, s2) {\n  if (s1.length > s2.length) return false;\n  const c1 = new Array(26).fill(0);\n  const c2 = new Array(26).fill(0);\n  for (let i = 0; i < s1.length; i++) {\n    c1[s1.charCodeAt(i) - 97]++;\n    c2[s2.charCodeAt(i) - 97]++;\n  }\n  const matches = (a, b) => a.every((v, i) => v === b[i]);\n  if (matches(c1, c2)) return true;\n  for (let i = s1.length; i < s2.length; i++) {\n    c2[s2.charCodeAt(i) - 97]++;\n    c2[s2.charCodeAt(i - s1.length) - 97]--;\n    if (matches(c1, c2)) return true;\n  }\n  return false;\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(checkInclusion(lines[0], lines[1]) ? 'true' : 'false');\n});",
    "PYTHON": "import sys\nfrom collections import Counter\n\nclass Solution:\n    def checkInclusion(self, s1: str, s2: str) -> bool:\n        if len(s1) > len(s2): return False\n        c1, c2 = Counter(s1), Counter(s2[:len(s1)])\n        if c1 == c2: return True\n        for i in range(len(s1), len(s2)):\n            c2[s2[i]] += 1\n            old = s2[i - len(s1)]\n            c2[old] -= 1\n            if c2[old] == 0: del c2[old]\n            if c1 == c2: return True\n        return False\n\nif __name__ == '__main__':\n    lines = [line.strip() for line in sys.stdin if line.strip()]\n    sol = Solution()\n    print(str(sol.checkInclusion(lines[0], lines[1])).lower())",
    "JAVA": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_18: ProblemSeed = {
  "title": "Minimum Window Substring",
  "description": "Given two strings s and t of lengths m and n respectively, return the minimum window substring of s such that every character in t (including duplicates) is included in the window. If there is no such substring, return the empty string \"\".",
  "difficulty": "HARD",
  "tags": [
    "Sliding Window",
    "Hash Table",
    "String"
  ],
  "constraints": "m == s.length\nn == t.length\n1 <= m, n <= 10^5\ns and t consist of uppercase and lowercase English letters.",
  "hints": "Use two pointers to create a window of letters in s. Expand right until valid, then shrink left to find minimum length.",
  "editorial": "Approach: Count target characters in t. Expand right pointer until window has all required characters. Then contract left pointer while window remains valid, updating minimum substring bounds.\nTime Complexity: O(m + n)\nSpace Complexity: O(m + n)",
  "testCases": [
    {
      "input": "ADOBECODEBANC\nABC",
      "output": "BANC"
    },
    {
      "input": "a\na",
      "output": "a"
    },
    {
      "input": "a\naa",
      "output": ""
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "s = \"ADOBECODEBANC\", t = \"ABC\"",
      "output": "BANC",
      "explanation": "The minimum window substring \"BANC\" includes 'A', 'B', and 'C' from string t."
    },
    "PYTHON": {
      "input": "s = \"ADOBECODEBANC\", t = \"ABC\"",
      "output": "BANC",
      "explanation": "The minimum window substring \"BANC\" includes 'A', 'B', and 'C' from string t."
    },
    "JAVA": {
      "input": "s = \"ADOBECODEBANC\", t = \"ABC\"",
      "output": "BANC",
      "explanation": "The minimum window substring \"BANC\" includes 'A', 'B', and 'C' from string t."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "function minWindow(s, t) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(minWindow(lines[0], lines[1]));\n});",
    "PYTHON": "import sys\n\nclass Solution:\n    def minWindow(self, s: str, t: str) -> str:\n        pass\n\nif __name__ == '__main__':\n    lines = [line.strip() for line in sys.stdin if line.strip()]\n    sol = Solution()\n    print(sol.minWindow(lines[0], lines[1]))",
    "JAVA": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function minWindow(s, t) {\n  if (!t.length || !s.length) return \"\";\n  const countT = {};\n  for (const c of t) countT[c] = (countT[c] || 0) + 1;\n  const window = {};\n  let have = 0, need = Object.keys(countT).length;\n  let res = [-1, -1], resLen = Infinity;\n  let l = 0;\n  for (let r = 0; r < s.length; r++) {\n    const c = s[r];\n    window[c] = (window[c] || 0) + 1;\n    if (countT[c] && window[c] === countT[c]) have++;\n    while (have === need) {\n      if (r - l + 1 < resLen) {\n        res = [l, r];\n        resLen = r - l + 1;\n      }\n      window[s[l]]--;\n      if (countT[s[l]] && window[s[l]] < countT[s[l]]) have--;\n      l++;\n    }\n  }\n  return resLen === Infinity ? \"\" : s.slice(res[0], res[1] + 1);\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(minWindow(lines[0], lines[1]));\n});",
    "PYTHON": "import sys\nfrom collections import Counter\n\nclass Solution:\n    def minWindow(self, s: str, t: str) -> str:\n        if not t or not s: return \"\"\n        target = Counter(t)\n        window = Counter()\n        have, need = 0, len(target)\n        res, res_len = (-1, -1), float('inf')\n        l = 0\n        for r, c in enumerate(s):\n            window[c] += 1\n            if c in target and window[c] == target[c]:\n                have += 1\n            while have == need:\n                if (r - l + 1) < res_len:\n                    res = (l, r)\n                    res_len = r - l + 1\n                window[s[l]] -= 1\n                if s[l] in target and window[s[l]] < target[s[l]]:\n                    have -= 1\n                l += 1\n        return \"\" if res_len == float('inf') else s[res[0]:res[1] + 1]\n\nif __name__ == '__main__':\n    lines = [line.strip() for line in sys.stdin if line.strip()]\n    sol = Solution()\n    print(sol.minWindow(lines[0], lines[1]))",
    "JAVA": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_19: ProblemSeed = {
  "title": "Sliding Window Maximum",
  "description": "You are given an array of integers nums, there is a sliding window of size k which is moving from the very left of the array to the very right. You can only see the k numbers in the window. Each time the sliding window moves right by one position. Return the max sliding window.",
  "difficulty": "HARD",
  "tags": [
    "Sliding Window",
    "Array",
    "Queue",
    "Monotonic Queue"
  ],
  "constraints": "1 <= nums.length <= 10^5\n-10^4 <= nums[i] <= 10^4\n1 <= k <= nums.length",
  "hints": "Can you use a monotonically decreasing deque to store indices of potential maximum elements in current window?",
  "editorial": "Approach: Use a deque of indices maintaining monotonically decreasing values. For index i, remove indices <= i - k from front. Remove indices whose values are smaller than nums[i] from back. Once i >= k - 1, nums[deque[0]] is the window maximum.\nTime Complexity: O(n)\nSpace Complexity: O(k)",
  "testCases": [
    {
      "input": "[1,3,-1,-3,5,3,6,7]\n3",
      "output": "[3,3,5,5,6,7]"
    },
    {
      "input": "[1]\n1",
      "output": "[1]"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "nums = [1,3,-1,-3,5,3,6,7], k = 3",
      "output": "[3,3,5,5,6,7]",
      "explanation": "Window position: [1 3 -1] -> 3, [3 -1 -3] -> 3, [-1 -3 5] -> 5, etc."
    },
    "PYTHON": {
      "input": "nums = [1,3,-1,-3,5,3,6,7], k = 3",
      "output": "[3,3,5,5,6,7]",
      "explanation": "Window position: [1 3 -1] -> 3, [3 -1 -3] -> 3, [-1 -3 5] -> 5, etc."
    },
    "JAVA": {
      "input": "nums = [1,3,-1,-3,5,3,6,7], k = 3",
      "output": "[3,3,5,5,6,7]",
      "explanation": "Window position: [1 3 -1] -> 3, [3 -1 -3] -> 3, [-1 -3 5] -> 5, etc."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "function maxSlidingWindow(nums, k) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(JSON.stringify(maxSlidingWindow(JSON.parse(lines[0]), parseInt(lines[1], 10))));\n});",
    "PYTHON": "import sys, json\n\nclass Solution:\n    def maxSlidingWindow(self, nums: list[int], k: int) -> list[int]:\n        pass\n\nif __name__ == '__main__':\n    lines = [line.strip() for line in sys.stdin if line.strip()]\n    sol = Solution()\n    print(json.dumps(sol.maxSlidingWindow(json.loads(lines[0]), int(lines[1]))))",
    "JAVA": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function maxSlidingWindow(nums, k) {\n  const deque = [];\n  const res = [];\n  for (let i = 0; i < nums.length; i++) {\n    while (deque.length && deque[0] < i - k + 1) deque.shift();\n    while (deque.length && nums[deque[deque.length - 1]] < nums[i]) deque.pop();\n    deque.push(i);\n    if (i >= k - 1) res.push(nums[deque[0]]);\n  }\n  return res;\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(JSON.stringify(maxSlidingWindow(JSON.parse(lines[0]), parseInt(lines[1], 10))));\n});",
    "PYTHON": "import sys, json\nfrom collections import deque\n\nclass Solution:\n    def maxSlidingWindow(self, nums: list[int], k: int) -> list[int]:\n        q = deque()\n        res = []\n        for i, n in enumerate(nums):\n            while q and q[0] < i - k + 1:\n                q.popleft()\n            while q and nums[q[-1]] < n:\n                q.pop()\n            q.append(i)\n            if i >= k - 1:\n                res.append(nums[q[0]])\n        return res\n\nif __name__ == '__main__':\n    lines = [line.strip() for line in sys.stdin if line.strip()]\n    sol = Solution()\n    print(json.dumps(sol.maxSlidingWindow(json.loads(lines[0]), int(lines[1]))))",
    "JAVA": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_20: ProblemSeed = {
  "title": "Valid Parentheses",
  "description": "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. An input string is valid if open brackets are closed by the same type of brackets, and closed in the correct order.",
  "difficulty": "EASY",
  "tags": [
    "Stack",
    "String"
  ],
  "constraints": "1 <= s.length <= 10^4\ns consists of parentheses only '()[]{}'.",
  "hints": "Push open brackets onto a stack. When encountering a closing bracket, check if it matches the top of the stack.",
  "editorial": "Approach: Use a stack. For closing brackets, check if top of stack matches; if so, pop. If mismatch or stack empty, return false. After iteration, return stack.length === 0.\nTime Complexity: O(n)\nSpace Complexity: O(n)",
  "testCases": [
    {
      "input": "()",
      "output": "true"
    },
    {
      "input": "()[]{}",
      "output": "true"
    },
    {
      "input": "(]",
      "output": "false"
    },
    {
      "input": "([)]",
      "output": "false"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "s = \"()[]{}\"",
      "output": "true",
      "explanation": "All opening brackets are matched and closed in the correct order."
    },
    "PYTHON": {
      "input": "s = \"()[]{}\"",
      "output": "true",
      "explanation": "All opening brackets are matched and closed in the correct order."
    },
    "JAVA": {
      "input": "s = \"()[]{}\"",
      "output": "true",
      "explanation": "All opening brackets are matched and closed in the correct order."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "function isValid(s) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nrl.on('line', (line) => {\n  console.log(isValid(line.trim()) ? 'true' : 'false');\n  rl.close();\n});",
    "PYTHON": "import sys\n\nclass Solution:\n    def isValid(self, s: str) -> bool:\n        pass\n\nif __name__ == '__main__':\n    s = sys.stdin.readline().strip()\n    sol = Solution()\n    print(str(sol.isValid(s)).lower())",
    "JAVA": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function isValid(s) {\n  const stack = [];\n  const map = { ')': '(', '}': '{', ']': '[' };\n  for (const c of s) {\n    if (map[c]) {\n      if (!stack.length || stack.pop() !== map[c]) return false;\n    } else {\n      stack.push(c);\n    }\n  }\n  return stack.length === 0;\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nrl.on('line', (line) => {\n  console.log(isValid(line.trim()) ? 'true' : 'false');\n  rl.close();\n});",
    "PYTHON": "import sys\n\nclass Solution:\n    def isValid(self, s: str) -> bool:\n        stack = []\n        mapping = {')': '(', '}': '{', ']': '['}\n        for c in s:\n            if c in mapping:\n                if not stack or stack.pop() != mapping[c]:\n                    return False\n            else:\n                stack.append(c)\n        return len(stack) == 0\n\nif __name__ == '__main__':\n    s = sys.stdin.readline().strip()\n    sol = Solution()\n    print(str(sol.isValid(s)).lower())",
    "JAVA": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_21: ProblemSeed = {
  "title": "Min Stack",
  "description": "Design a stack that supports push, pop, top, and retrieving the minimum element in constant time. Implement the MinStack class:\n- push(val): Pushes val onto stack.\n- pop(): Removes element on top of stack.\n- top(): Gets the top element.\n- getMin(): Retrieves the minimum element in stack.",
  "difficulty": "MEDIUM",
  "tags": [
    "Stack",
    "Design"
  ],
  "constraints": "-2^31 <= val <= 2^31 - 1\nMethods pop, top and getMin operations will always be called on non-empty stacks.\nAt most 3 * 10^4 calls will be made to push, pop, top, and getMin.",
  "hints": "Can you maintain a second stack that records the minimum value at each depth?",
  "editorial": "Approach: Use two stacks: one for the regular values, and one for the minimums seen so far. On push(val), minStack pushes min(val, minStack.top()). On pop, pop from both stacks.\nTime Complexity: O(1) for all operations\nSpace Complexity: O(n)",
  "testCases": [
    {
      "input": "[\"push\",\"push\",\"push\",\"getMin\",\"pop\",\"top\",\"getMin\"]\n[[-2],[0],[-3],[],[],[],[]]",
      "output": "[null,null,null,-3,null,0,-2]"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "[\"MinStack\",\"push\",\"push\",\"push\",\"getMin\",\"pop\",\"top\",\"getMin\"]",
      "output": "[null,null,null,-3,null,0,-2]",
      "explanation": "Returns minimum -3, then after pop top is 0, minimum is -2."
    },
    "PYTHON": {
      "input": "[\"MinStack\",\"push\",\"push\",\"push\",\"getMin\",\"pop\",\"top\",\"getMin\"]",
      "output": "[null,null,null,-3,null,0,-2]",
      "explanation": "Returns minimum -3, then after pop top is 0, minimum is -2."
    },
    "JAVA": {
      "input": "[\"MinStack\",\"push\",\"push\",\"push\",\"getMin\",\"pop\",\"top\",\"getMin\"]",
      "output": "[null,null,null,-3,null,0,-2]",
      "explanation": "Returns minimum -3, then after pop top is 0, minimum is -2."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "class MinStack {\n  constructor() {}\n  push(val) {}\n  pop() {}\n  top() {}\n  getMin() {}\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  // runner\n});",
    "PYTHON": "import sys, json\n\nclass MinStack:\n    def __init__(self):\n        pass\n    def push(self, val: int) -> None:\n        pass\n    def pop(self) -> None:\n        pass\n    def top(self) -> int:\n        pass\n    def getMin(self) -> int:\n        pass",
    "JAVA": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "class MinStack {\n  constructor() {\n    this.stack = [];\n    this.minStack = [];\n  }\n  push(val) {\n    this.stack.push(val);\n    const min = this.minStack.length === 0 ? val : Math.min(val, this.minStack[this.minStack.length - 1]);\n    this.minStack.push(min);\n  }\n  pop() {\n    this.stack.pop();\n    this.minStack.pop();\n  }\n  top() {\n    return this.stack[this.stack.length - 1];\n  }\n  getMin() {\n    return this.minStack[this.minStack.length - 1];\n  }\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  const ops = JSON.parse(lines[0]);\n  const args = JSON.parse(lines[1]);\n  const ms = new MinStack();\n  const res = [];\n  for (let i = 0; i < ops.length; i++) {\n    const op = ops[i];\n    if (op === 'push') { ms.push(args[i][0]); res.push(null); }\n    else if (op === 'pop') { ms.pop(); res.push(null); }\n    else if (op === 'top') { res.push(ms.top()); }\n    else if (op === 'getMin') { res.push(ms.getMin()); }\n  }\n  console.log(JSON.stringify(res));\n});",
    "PYTHON": "import sys, json\n\nclass MinStack:\n    def __init__(self):\n        self.stack = []\n        self.min_stack = []\n    def push(self, val: int) -> None:\n        self.stack.append(val)\n        m = val if not self.min_stack else min(val, self.min_stack[-1])\n        self.min_stack.append(m)\n    def pop(self) -> None:\n        self.stack.pop()\n        self.min_stack.pop()\n    def top(self) -> int:\n        return self.stack[-1]\n    def getMin(self) -> int:\n        return self.min_stack[-1]\n\nif __name__ == '__main__':\n    lines = [line.strip() for line in sys.stdin if line.strip()]\n    ops = json.loads(lines[0])\n    args = json.loads(lines[1])\n    ms = MinStack()\n    res = []\n    for op, arg in zip(ops, args):\n        if op == 'push': ms.push(arg[0]); res.append(None)\n        elif op == 'pop': ms.pop(); res.append(None)\n        elif op == 'top': res.append(ms.top())\n        elif op == 'getMin': res.append(ms.getMin())\n    print(json.dumps(res))",
    "JAVA": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_22: ProblemSeed = {
  "title": "Evaluate Reverse Polish Notation",
  "description": "You are given an array of strings tokens that represents an arithmetic expression in a Reverse Polish Notation. Evaluate the expression. Return an integer that represents the value of the expression.",
  "difficulty": "MEDIUM",
  "tags": [
    "Stack",
    "Array",
    "Math"
  ],
  "constraints": "1 <= tokens.length <= 10^4\ntokens[i] is either an operator: \"+\", \"-\", \"*\", or \"/\", or an integer in the range [-200, 200].",
  "hints": "Push numbers onto the stack. When an operator is met, pop two operands, apply the operator, and push the result.",
  "editorial": "Approach: Iterate tokens. If operand, push parsed integer. If operator (+,-,*,/), pop b, pop a, calculate result with truncated integer division for '/', and push back onto stack. Return stack[0].\nTime Complexity: O(n)\nSpace Complexity: O(n)",
  "testCases": [
    {
      "input": "[\"2\",\"1\",\"+\",\"3\",\"*\"]",
      "output": "9"
    },
    {
      "input": "[\"4\",\"13\",\"5\",\"/\",\"+\"]",
      "output": "6"
    },
    {
      "input": "[\"10\",\"6\",\"9\",\"3\",\"+\",\"-11\",\"*\",\"/\",\"*\",\"17\",\"+\",\"5\",\"+\"]",
      "output": "22"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "tokens = [\"2\",\"1\",\"+\",\"3\",\"*\"]",
      "output": "9",
      "explanation": "((2 + 1) * 3) = 9"
    },
    "PYTHON": {
      "input": "tokens = [\"2\",\"1\",\"+\",\"3\",\"*\"]",
      "output": "9",
      "explanation": "((2 + 1) * 3) = 9"
    },
    "JAVA": {
      "input": "tokens = [\"2\",\"1\",\"+\",\"3\",\"*\"]",
      "output": "9",
      "explanation": "((2 + 1) * 3) = 9"
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "function evalRPN(tokens) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nrl.on('line', (line) => {\n  console.log(evalRPN(JSON.parse(line.trim())));\n  rl.close();\n});",
    "PYTHON": "import sys, json\n\nclass Solution:\n    def evalRPN(self, tokens: list[str]) -> int:\n        pass\n\nif __name__ == '__main__':\n    tokens = json.loads(sys.stdin.readline().strip())\n    sol = Solution()\n    print(sol.evalRPN(tokens))",
    "JAVA": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function evalRPN(tokens) {\n  const stack = [];\n  for (const t of tokens) {\n    if (t === '+') {\n      stack.push(stack.pop() + stack.pop());\n    } else if (t === '-') {\n      const b = stack.pop(), a = stack.pop();\n      stack.push(a - b);\n    } else if (t === '*') {\n      stack.push(stack.pop() * stack.pop());\n    } else if (t === '/') {\n      const b = stack.pop(), a = stack.pop();\n      stack.push(Math.trunc(a / b));\n    } else {\n      stack.push(parseInt(t, 10));\n    }\n  }\n  return stack[0];\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nrl.on('line', (line) => {\n  console.log(evalRPN(JSON.parse(line.trim())));\n  rl.close();\n});",
    "PYTHON": "import sys, json\n\nclass Solution:\n    def evalRPN(self, tokens: list[str]) -> int:\n        stack = []\n        for t in tokens:\n            if t == '+':\n                stack.append(stack.pop() + stack.pop())\n            elif t == '-':\n                b = stack.pop()\n                a = stack.pop()\n                stack.append(a - b)\n            elif t == '*':\n                stack.append(stack.pop() * stack.pop())\n            elif t == '/':\n                b = stack.pop()\n                a = stack.pop()\n                stack.append(int(a / b))\n            else:\n                stack.append(int(t))\n        return stack[0]\n\nif __name__ == '__main__':\n    tokens = json.loads(sys.stdin.readline().strip())\n    sol = Solution()\n    print(sol.evalRPN(tokens))",
    "JAVA": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_23: ProblemSeed = {
  "title": "Generate Parentheses",
  "description": "Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.",
  "difficulty": "MEDIUM",
  "tags": [
    "Stack",
    "String",
    "Dynamic Programming",
    "Backtracking"
  ],
  "constraints": "1 <= n <= 8",
  "hints": "Can you keep count of open and close brackets? An open bracket can be added if open < n; a close bracket can be added if close < open.",
  "editorial": "Approach: Backtracking. Maintain open and close bracket counts. If open < n, recurse adding '('. If close < open, recurse adding ')'. When path length === 2 * n, record combination.\nTime Complexity: O(4^n / sqrt(n)) (Catalan number)\nSpace Complexity: O(n) call stack",
  "testCases": [
    {
      "input": "3",
      "output": "[\"((()))\",\"(()())\",\"(())()\",\"()(())\",\"()()()\"]"
    },
    {
      "input": "1",
      "output": "[\"()\"]"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "n = 3",
      "output": "[\"((()))\",\"(()())\",\"(())()\",\"()(())\",\"()()()\"]",
      "explanation": "5 combinations of 3 valid pairs."
    },
    "PYTHON": {
      "input": "n = 3",
      "output": "[\"((()))\",\"(()())\",\"(())()\",\"()(())\",\"()()()\"]",
      "explanation": "5 combinations of 3 valid pairs."
    },
    "JAVA": {
      "input": "n = 3",
      "output": "[\"((()))\",\"(()())\",\"(())()\",\"()(())\",\"()()()\"]",
      "explanation": "5 combinations of 3 valid pairs."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "function generateParenthesis(n) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nrl.on('line', (line) => {\n  console.log(JSON.stringify(generateParenthesis(parseInt(line.trim(), 10))));\n  rl.close();\n});",
    "PYTHON": "import sys, json\n\nclass Solution:\n    def generateParenthesis(self, n: int) -> list[str]:\n        pass\n\nif __name__ == '__main__':\n    n = int(sys.stdin.readline().strip())\n    sol = Solution()\n    print(json.dumps(sol.generateParenthesis(n)))",
    "JAVA": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function generateParenthesis(n) {\n  const res = [];\n  function backtrack(s, open, close) {\n    if (s.length === 2 * n) {\n      res.push(s);\n      return;\n    }\n    if (open < n) backtrack(s + '(', open + 1, close);\n    if (close < open) backtrack(s + ')', open, close + 1);\n  }\n  backtrack('', 0, 0);\n  return res;\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nrl.on('line', (line) => {\n  console.log(JSON.stringify(generateParenthesis(parseInt(line.trim(), 10))));\n  rl.close();\n});",
    "PYTHON": "import sys, json\n\nclass Solution:\n    def generateParenthesis(self, n: int) -> list[str]:\n        res = []\n        def backtrack(s, open_cnt, close_cnt):\n            if len(s) == 2 * n:\n                res.append(s)\n                return\n            if open_cnt < n:\n                backtrack(s + '(', open_cnt + 1, close_cnt)\n            if close_cnt < open_cnt:\n                backtrack(s + ')', open_cnt, close_cnt + 1)\n        backtrack('', 0, 0)\n        return res\n\nif __name__ == '__main__':\n    n = int(sys.stdin.readline().strip())\n    sol = Solution()\n    print(json.dumps(sol.generateParenthesis(n)))",
    "JAVA": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_24: ProblemSeed = {
  "title": "Daily Temperatures",
  "description": "Given an array of integers temperatures represents the daily temperatures, return an array answer such that answer[i] is the number of days you have to wait after the ith day to get a warmer temperature. If there is no future day for which this is possible, keep answer[i] == 0 instead.",
  "difficulty": "MEDIUM",
  "tags": [
    "Stack",
    "Array",
    "Monotonic Stack"
  ],
  "constraints": "1 <= temperatures.length <= 10^5\n30 <= temperatures[i] <= 100",
  "hints": "Can you maintain a monotonic decreasing stack storing the indices of days whose warmer days haven't been found yet?",
  "editorial": "Approach: Use a monotonic stack storing indices. Iterate through temperatures: while stack is non-empty and temperatures[i] > temperatures[stack.top()], pop prevIndex and answer[prevIndex] = i - prevIndex. Then push i onto stack.\nTime Complexity: O(n)\nSpace Complexity: O(n)",
  "testCases": [
    {
      "input": "[73,74,75,71,69,72,76,73]",
      "output": "[1,1,4,2,1,1,0,0]"
    },
    {
      "input": "[30,40,50,60]",
      "output": "[1,1,1,0]"
    },
    {
      "input": "[30,60,90]",
      "output": "[1,1,0]"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "temperatures = [73,74,75,71,69,72,76,73]",
      "output": "[1,1,4,2,1,1,0,0]",
      "explanation": "Next warmer day for 73 is next day (74), for 75 is 4 days later (76), etc."
    },
    "PYTHON": {
      "input": "temperatures = [73,74,75,71,69,72,76,73]",
      "output": "[1,1,4,2,1,1,0,0]",
      "explanation": "Next warmer day for 73 is next day (74), for 75 is 4 days later (76), etc."
    },
    "JAVA": {
      "input": "temperatures = [73,74,75,71,69,72,76,73]",
      "output": "[1,1,4,2,1,1,0,0]",
      "explanation": "Next warmer day for 73 is next day (74), for 75 is 4 days later (76), etc."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "function dailyTemperatures(temperatures) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nrl.on('line', (line) => {\n  console.log(JSON.stringify(dailyTemperatures(JSON.parse(line.trim()))));\n  rl.close();\n});",
    "PYTHON": "import sys, json\n\nclass Solution:\n    def dailyTemperatures(self, temperatures: list[int]) -> list[int]:\n        pass\n\nif __name__ == '__main__':\n    temps = json.loads(sys.stdin.readline().strip())\n    sol = Solution()\n    print(json.dumps(sol.dailyTemperatures(temps)))",
    "JAVA": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function dailyTemperatures(temperatures) {\n  const res = new Array(temperatures.length).fill(0);\n  const stack = [];\n  for (let i = 0; i < temperatures.length; i++) {\n    while (stack.length && temperatures[i] > temperatures[stack[stack.length - 1]]) {\n      const prevIdx = stack.pop();\n      res[prevIdx] = i - prevIdx;\n    }\n    stack.push(i);\n  }\n  return res;\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nrl.on('line', (line) => {\n  console.log(JSON.stringify(dailyTemperatures(JSON.parse(line.trim()))));\n  rl.close();\n});",
    "PYTHON": "import sys, json\n\nclass Solution:\n    def dailyTemperatures(self, temperatures: list[int]) -> list[int]:\n        res = [0] * len(temperatures)\n        stack = []\n        for i, t in enumerate(temperatures):\n            while stack and t > temperatures[stack[-1]]:\n                prev_i = stack.pop()\n                res[prev_i] = i - prev_i\n            stack.append(i)\n        return res\n\nif __name__ == '__main__':\n    temps = json.loads(sys.stdin.readline().strip())\n    sol = Solution()\n    print(json.dumps(sol.dailyTemperatures(temps)))",
    "JAVA": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_25: ProblemSeed = {
  "title": "Car Fleet",
  "description": "There are n cars going to the same destination along a one-lane road. The destination is target miles away. You are given two integer array position and speed, both of length n, where position[i] is the position of the ith car and speed[i] is the speed of the ith car (in miles per hour). A car can never pass another car ahead of it, but it can catch up to it and drive bumper to bumper at the same speed. The faster car will slow down to match the slower car's speed. The distance between these two cars is ignored. A car fleet is some non-empty set of cars driving at the same position and same speed. Note that a single car is also a car fleet. If a car catches up to a car fleet right at the destination point, it will still be considered as one car fleet. Return the number of car fleets that will arrive at the destination.",
  "difficulty": "MEDIUM",
  "tags": [
    "Stack",
    "Array",
    "Sorting",
    "Monotonic Stack"
  ],
  "constraints": "n == position.length == speed.length\n1 <= n <= 10^5\n0 < target <= 10^6\n0 <= position[i] < target\nAll the values of position are unique.\n0 < speed[i] <= 10^6",
  "hints": "Sort cars in descending order of position. Calculate the time each car needs to reach the target.",
  "editorial": "Approach: Pair positions with speeds, sort by position in descending order. Calculate time = (target - pos) / spd for each car. If a car takes <= time than the fleet ahead, it merges into that fleet. Otherwise, it starts a new fleet.\nTime Complexity: O(n log n)\nSpace Complexity: O(n)",
  "testCases": [
    {
      "input": "12\n[10,8,0,5,3]\n[2,4,1,1,3]",
      "output": "3"
    },
    {
      "input": "10\n[3]\n[3]",
      "output": "1"
    },
    {
      "input": "100\n[0,2,4]\n[4,2,1]",
      "output": "1"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "target = 12, position = [10,8,0,5,3], speed = [2,4,1,1,3]",
      "output": "3",
      "explanation": "Car fleets formed are 3."
    },
    "PYTHON": {
      "input": "target = 12, position = [10,8,0,5,3], speed = [2,4,1,1,3]",
      "output": "3",
      "explanation": "Car fleets formed are 3."
    },
    "JAVA": {
      "input": "target = 12, position = [10,8,0,5,3], speed = [2,4,1,1,3]",
      "output": "3",
      "explanation": "Car fleets formed are 3."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "function carFleet(target, position, speed) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(carFleet(parseInt(lines[0], 10), JSON.parse(lines[1]), JSON.parse(lines[2])));\n});",
    "PYTHON": "import sys, json\n\nclass Solution:\n    def carFleet(self, target: int, position: list[int], speed: list[int]) -> int:\n        pass\n\nif __name__ == '__main__':\n    lines = [line.strip() for line in sys.stdin if line.strip()]\n    sol = Solution()\n    print(sol.carFleet(int(lines[0]), json.loads(lines[1]), json.loads(lines[2])))",
    "JAVA": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function carFleet(target, position, speed) {\n  const pair = position.map((p, i) => [p, speed[i]]);\n  pair.sort((a, b) => b[0] - a[0]);\n  const stack = [];\n  for (const [p, s] of pair) {\n    const time = (target - p) / s;\n    if (!stack.length || time > stack[stack.length - 1]) {\n      stack.push(time);\n    }\n  }\n  return stack.length;\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(carFleet(parseInt(lines[0], 10), JSON.parse(lines[1]), JSON.parse(lines[2])));\n});",
    "PYTHON": "import sys, json\n\nclass Solution:\n    def carFleet(self, target: int, position: list[int], speed: list[int]) -> int:\n        pair = sorted(zip(position, speed), reverse=True)\n        stack = []\n        for p, s in pair:\n            time = (target - p) / s\n            if not stack or time > stack[-1]:\n                stack.append(time)\n        return len(stack)\n\nif __name__ == '__main__':\n    lines = [line.strip() for line in sys.stdin if line.strip()]\n    sol = Solution()\n    print(sol.carFleet(int(lines[0]), json.loads(lines[1]), json.loads(lines[2])))",
    "JAVA": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_26: ProblemSeed = {
  "title": "Largest Rectangle in Histogram",
  "description": "Given an array of integers heights representing the histogram's bar height where the width of each bar is 1, return the area of the largest rectangle in the histogram.",
  "difficulty": "HARD",
  "tags": [
    "Stack",
    "Array",
    "Monotonic Stack"
  ],
  "constraints": "1 <= heights.length <= 10^5\n0 <= heights[i] <= 10^4",
  "hints": "Maintain a monotonic increasing stack of [index, height]. When a shorter bar is encountered, pop and compute area with popped height.",
  "editorial": "Approach: Use a stack of pairs [index, height]. For each bar, while top height > current height, pop [idx, h] and update maxArea = max(maxArea, h * (i - idx)). After loop, pop remaining elements using n as right boundary.\nTime Complexity: O(n)\nSpace Complexity: O(n)",
  "testCases": [
    {
      "input": "[2,1,5,6,2,3]",
      "output": "10"
    },
    {
      "input": "[2,4]",
      "output": "4"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "heights = [2,1,5,6,2,3]",
      "output": "10",
      "explanation": "The largest rectangle is formed by bars [5, 6] with area = 5 * 2 = 10."
    },
    "PYTHON": {
      "input": "heights = [2,1,5,6,2,3]",
      "output": "10",
      "explanation": "The largest rectangle is formed by bars [5, 6] with area = 5 * 2 = 10."
    },
    "JAVA": {
      "input": "heights = [2,1,5,6,2,3]",
      "output": "10",
      "explanation": "The largest rectangle is formed by bars [5, 6] with area = 5 * 2 = 10."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "function largestRectangleArea(heights) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nrl.on('line', (line) => {\n  console.log(largestRectangleArea(JSON.parse(line.trim())));\n  rl.close();\n});",
    "PYTHON": "import sys, json\n\nclass Solution:\n    def largestRectangleArea(self, heights: list[int]) -> int:\n        pass\n\nif __name__ == '__main__':\n    heights = json.loads(sys.stdin.readline().strip())\n    sol = Solution()\n    print(sol.largestRectangleArea(heights))",
    "JAVA": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function largestRectangleArea(heights) {\n  let maxArea = 0;\n  const stack = [];\n  for (let i = 0; i < heights.length; i++) {\n    let start = i;\n    while (stack.length && stack[stack.length - 1][1] > heights[i]) {\n      const [idx, h] = stack.pop();\n      maxArea = Math.max(maxArea, h * (i - idx));\n      start = idx;\n    }\n    stack.push([start, heights[i]]);\n  }\n  for (const [idx, h] of stack) {\n    maxArea = Math.max(maxArea, h * (heights.length - idx));\n  }\n  return maxArea;\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nrl.on('line', (line) => {\n  console.log(largestRectangleArea(JSON.parse(line.trim())));\n  rl.close();\n});",
    "PYTHON": "import sys, json\n\nclass Solution:\n    def largestRectangleArea(self, heights: list[int]) -> int:\n        max_area = 0\n        stack = []\n        for i, h in enumerate(heights):\n            start = i\n            while stack and stack[-1][1] > h:\n                idx, height = stack.pop()\n                max_area = max(max_area, height * (i - idx))\n                start = idx\n            stack.append((start, h))\n        for idx, h in stack:\n            max_area = max(max_area, h * (len(heights) - idx))\n        return max_area\n\nif __name__ == '__main__':\n    heights = json.loads(sys.stdin.readline().strip())\n    sol = Solution()\n    print(sol.largestRectangleArea(heights))",
    "JAVA": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_27: ProblemSeed = {
  "title": "Binary Search",
  "description": "Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1. You must write an algorithm with O(log n) runtime complexity.",
  "difficulty": "EASY",
  "tags": [
    "Binary Search",
    "Array"
  ],
  "constraints": "1 <= nums.length <= 10^4\n-10^4 < nums[i], target < 10^4\nAll the integers in nums are unique.\nnums is sorted in ascending order.",
  "hints": "Maintain search bounds [low, high] and check the midpoint.",
  "editorial": "Approach: Binary search with low = 0 and high = nums.length - 1. Mid = Math.floor((low + high) / 2). If nums[mid] === target return mid. If nums[mid] < target search right half (low = mid + 1), otherwise search left half (high = mid - 1).\nTime Complexity: O(log n)\nSpace Complexity: O(1)",
  "testCases": [
    {
      "input": "[-1,0,3,5,9,12]\n9",
      "output": "4"
    },
    {
      "input": "[-1,0,3,5,9,12]\n2",
      "output": "-1"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "nums = [-1,0,3,5,9,12], target = 9",
      "output": "4",
      "explanation": "9 exists in nums and its index is 4."
    },
    "PYTHON": {
      "input": "nums = [-1,0,3,5,9,12], target = 9",
      "output": "4",
      "explanation": "9 exists in nums and its index is 4."
    },
    "JAVA": {
      "input": "nums = [-1,0,3,5,9,12], target = 9",
      "output": "4",
      "explanation": "9 exists in nums and its index is 4."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "function search(nums, target) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(search(JSON.parse(lines[0]), parseInt(lines[1], 10)));\n});",
    "PYTHON": "import sys, json\n\nclass Solution:\n    def search(self, nums: list[int], target: int) -> int:\n        pass\n\nif __name__ == '__main__':\n    lines = [line.strip() for line in sys.stdin if line.strip()]\n    sol = Solution()\n    print(sol.search(json.loads(lines[0]), int(lines[1])))",
    "JAVA": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function search(nums, target) {\n  let l = 0, r = nums.length - 1;\n  while (l <= r) {\n    const mid = Math.floor((l + r) / 2);\n    if (nums[mid] === target) return mid;\n    if (nums[mid] < target) l = mid + 1;\n    else r = mid - 1;\n  }\n  return -1;\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(search(JSON.parse(lines[0]), parseInt(lines[1], 10)));\n});",
    "PYTHON": "import sys, json\n\nclass Solution:\n    def search(self, nums: list[int], target: int) -> int:\n        l, r = 0, len(nums) - 1\n        while l <= r:\n            mid = (l + r) // 2\n            if nums[mid] == target:\n                return mid\n            elif nums[mid] < target:\n                l = mid + 1\n            else:\n                r = mid - 1\n        return -1\n\nif __name__ == '__main__':\n    lines = [line.strip() for line in sys.stdin if line.strip()]\n    sol = Solution()\n    print(sol.search(json.loads(lines[0]), int(lines[1])))",
    "JAVA": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_28: ProblemSeed = {
  "title": "Search a 2D Matrix",
  "description": "You are given an m x n integer matrix matrix with the following two properties:\n- Each row is sorted in non-decreasing order.\n- The first integer of each row is greater than the last integer of the previous row.\nGiven an integer target, return true if target is in matrix or false otherwise. You must write a solution in O(log(m * n)) time complexity.",
  "difficulty": "MEDIUM",
  "tags": [
    "Binary Search",
    "Array",
    "Matrix"
  ],
  "constraints": "m == matrix.length\nn == matrix[i].length\n1 <= m, n <= 100\n-10^4 <= matrix[i][j], target <= 10^4",
  "hints": "Treat the 2D matrix as a flat 1D sorted array of size m * n.",
  "editorial": "Approach: Standard binary search on range [0, m * n - 1]. Map index mid to row = Math.floor(mid / n) and col = mid % n.\nTime Complexity: O(log(m * n))\nSpace Complexity: O(1)",
  "testCases": [
    {
      "input": "[[1,3,5,7],[10,11,16,20],[23,30,34,60]]\n3",
      "output": "true"
    },
    {
      "input": "[[1,3,5,7],[10,11,16,20],[23,30,34,60]]\n13",
      "output": "false"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3",
      "output": "true",
      "explanation": "3 exists in the matrix."
    },
    "PYTHON": {
      "input": "matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3",
      "output": "true",
      "explanation": "3 exists in the matrix."
    },
    "JAVA": {
      "input": "matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3",
      "output": "true",
      "explanation": "3 exists in the matrix."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "function searchMatrix(matrix, target) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(searchMatrix(JSON.parse(lines[0]), parseInt(lines[1], 10)) ? 'true' : 'false');\n});",
    "PYTHON": "import sys, json\n\nclass Solution:\n    def searchMatrix(self, matrix: list[list[int]], target: int) -> bool:\n        pass\n\nif __name__ == '__main__':\n    lines = [line.strip() for line in sys.stdin if line.strip()]\n    sol = Solution()\n    print(str(sol.searchMatrix(json.loads(lines[0]), int(lines[1]))).lower())",
    "JAVA": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function searchMatrix(matrix, target) {\n  const m = matrix.length, n = matrix[0].length;\n  let l = 0, r = m * n - 1;\n  while (l <= r) {\n    const mid = Math.floor((l + r) / 2);\n    const val = matrix[Math.floor(mid / n)][mid % n];\n    if (val === target) return true;\n    if (val < target) l = mid + 1;\n    else r = mid - 1;\n  }\n  return false;\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(searchMatrix(JSON.parse(lines[0]), parseInt(lines[1], 10)) ? 'true' : 'false');\n});",
    "PYTHON": "import sys, json\n\nclass Solution:\n    def searchMatrix(self, matrix: list[list[int]], target: int) -> bool:\n        m, n = len(matrix), len(matrix[0])\n        l, r = 0, m * n - 1\n        while l <= r:\n            mid = (l + r) // 2\n            val = matrix[mid // n][mid % n]\n            if val == target:\n                return True\n            elif val < target:\n                l = mid + 1\n            else:\n                r = mid - 1\n        return False\n\nif __name__ == '__main__':\n    lines = [line.strip() for line in sys.stdin if line.strip()]\n    sol = Solution()\n    print(str(sol.searchMatrix(json.loads(lines[0]), int(lines[1]))).lower())",
    "JAVA": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_29: ProblemSeed = {
  "title": "Koko Eating Bananas",
  "description": "Koko loves to eat bananas. There are n piles of bananas, the ith pile has piles[i] bananas. The guards have gone and will come back in h hours. Koko can decide her bananas-per-hour eating speed of k. Each hour, she chooses some pile of bananas and eats k bananas from that pile. If the pile has less than k bananas, she eats all of them instead and will not eat any more bananas during this hour. Koko likes to eat slowly but still wants to finish eating all the bananas before the guards return. Return the minimum integer k such that she can eat all the bananas within h hours.",
  "difficulty": "MEDIUM",
  "tags": [
    "Binary Search",
    "Array"
  ],
  "constraints": "1 <= piles.length <= 10^4\npiles.length <= h <= 10^9\n1 <= piles[i] <= 10^9",
  "hints": "Binary search on the eating speed k between 1 and max(piles).",
  "editorial": "Approach: Binary search over possible speeds k in [1, max(piles)]. For each speed k, compute total hours = sum(Math.ceil(p / k)). If total hours <= h, search lower speeds; else increase speed.\nTime Complexity: O(n log(max(piles)))\nSpace Complexity: O(1)",
  "testCases": [
    {
      "input": "[3,6,7,11]\n8",
      "output": "4"
    },
    {
      "input": "[30,11,23,4,20]\n5",
      "output": "30"
    },
    {
      "input": "[30,11,23,4,20]\n6",
      "output": "23"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "piles = [3,6,7,11], h = 8",
      "output": "4",
      "explanation": "With k = 4, hours spent: 1 + 2 + 2 + 3 = 8 <= 8."
    },
    "PYTHON": {
      "input": "piles = [3,6,7,11], h = 8",
      "output": "4",
      "explanation": "With k = 4, hours spent: 1 + 2 + 2 + 3 = 8 <= 8."
    },
    "JAVA": {
      "input": "piles = [3,6,7,11], h = 8",
      "output": "4",
      "explanation": "With k = 4, hours spent: 1 + 2 + 2 + 3 = 8 <= 8."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "function minEatingSpeed(piles, h) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(minEatingSpeed(JSON.parse(lines[0]), parseInt(lines[1], 10)));\n});",
    "PYTHON": "import sys, json\n\nclass Solution:\n    def minEatingSpeed(self, piles: list[int], h: int) -> int:\n        pass\n\nif __name__ == '__main__':\n    lines = [line.strip() for line in sys.stdin if line.strip()]\n    sol = Solution()\n    print(sol.minEatingSpeed(json.loads(lines[0]), int(lines[1])))",
    "JAVA": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function minEatingSpeed(piles, h) {\n  let l = 1, r = Math.max(...piles);\n  let res = r;\n  while (l <= r) {\n    const k = Math.floor((l + r) / 2);\n    let hours = 0;\n    for (const p of piles) hours += Math.ceil(p / k);\n    if (hours <= h) {\n      res = k;\n      r = k - 1;\n    } else {\n      l = k + 1;\n    }\n  }\n  return res;\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(minEatingSpeed(JSON.parse(lines[0]), parseInt(lines[1], 10)));\n});",
    "PYTHON": "import sys, json, math\n\nclass Solution:\n    def minEatingSpeed(self, piles: list[int], h: int) -> int:\n        l, r = 1, max(piles)\n        res = r\n        while l <= r:\n            k = (l + r) // 2\n            hours = sum(math.ceil(p / k) for p in piles)\n            if hours <= h:\n                res = k\n                r = k - 1\n            else:\n                l = k + 1\n        return res\n\nif __name__ == '__main__':\n    lines = [line.strip() for line in sys.stdin if line.strip()]\n    sol = Solution()\n    print(sol.minEatingSpeed(json.loads(lines[0]), int(lines[1])))",
    "JAVA": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_30: ProblemSeed = {
  "title": "Search in Rotated Sorted Array",
  "description": "There is an integer array nums sorted in ascending order (with distinct values). Prior to being passed to your function, nums is possibly rotated at an unknown pivot index. Given the array nums after the possible rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums. You must write an algorithm with O(log n) runtime complexity.",
  "difficulty": "MEDIUM",
  "tags": [
    "Binary Search",
    "Array"
  ],
  "constraints": "1 <= nums.length <= 5000\n-10^4 <= nums[i] <= 10^4\nAll values of nums are unique.\nnums is an ascending array that is possibly rotated.\n-10^4 <= target <= 10^4",
  "hints": "At least one half (left or right) is always sorted. Check if target lies within the sorted half.",
  "editorial": "Approach: In binary search, determine if left half [l, mid] is sorted (nums[l] <= nums[mid]). If so, check if target is in [nums[l], nums[mid]]. If yes, search left (r = mid - 1); else search right (l = mid + 1). Otherwise, right half is sorted.\nTime Complexity: O(log n)\nSpace Complexity: O(1)",
  "testCases": [
    {
      "input": "[4,5,6,7,0,1,2]\n0",
      "output": "4"
    },
    {
      "input": "[4,5,6,7,0,1,2]\n3",
      "output": "-1"
    },
    {
      "input": "[1]\n0",
      "output": "-1"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "nums = [4,5,6,7,0,1,2], target = 0",
      "output": "4",
      "explanation": "0 is at index 4."
    },
    "PYTHON": {
      "input": "nums = [4,5,6,7,0,1,2], target = 0",
      "output": "4",
      "explanation": "0 is at index 4."
    },
    "JAVA": {
      "input": "nums = [4,5,6,7,0,1,2], target = 0",
      "output": "4",
      "explanation": "0 is at index 4."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "function search(nums, target) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(search(JSON.parse(lines[0]), parseInt(lines[1], 10)));\n});",
    "PYTHON": "import sys, json\n\nclass Solution:\n    def search(self, nums: list[int], target: int) -> int:\n        pass\n\nif __name__ == '__main__':\n    lines = [line.strip() for line in sys.stdin if line.strip()]\n    sol = Solution()\n    print(sol.search(json.loads(lines[0]), int(lines[1])))",
    "JAVA": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function search(nums, target) {\n  let l = 0, r = nums.length - 1;\n  while (l <= r) {\n    const mid = Math.floor((l + r) / 2);\n    if (nums[mid] === target) return mid;\n    if (nums[l] <= nums[mid]) {\n      if (target >= nums[l] && target < nums[mid]) r = mid - 1;\n      else l = mid + 1;\n    } else {\n      if (target > nums[mid] && target <= nums[r]) l = mid + 1;\n      else r = mid - 1;\n    }\n  }\n  return -1;\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(search(JSON.parse(lines[0]), parseInt(lines[1], 10)));\n});",
    "PYTHON": "import sys, json\n\nclass Solution:\n    def search(self, nums: list[int], target: int) -> int:\n        l, r = 0, len(nums) - 1\n        while l <= r:\n            mid = (l + r) // 2\n            if nums[mid] == target:\n                return mid\n            if nums[l] <= nums[mid]:\n                if nums[l] <= target < nums[mid]:\n                    r = mid - 1\n                else:\n                    l = mid + 1\n            else:\n                if nums[mid] < target <= nums[r]:\n                    l = mid + 1\n                else:\n                    r = mid - 1\n        return -1\n\nif __name__ == '__main__':\n    lines = [line.strip() for line in sys.stdin if line.strip()]\n    sol = Solution()\n    print(sol.search(json.loads(lines[0]), int(lines[1])))",
    "JAVA": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_31: ProblemSeed = {
  "title": "Find Minimum in Rotated Sorted Array",
  "description": "Suppose an array of length n sorted in ascending order is rotated between 1 and n times. Notice that rotating an array [a[0], a[1], a[2], ..., a[n-1]] 1 time results in the array [a[n-1], a[0], a[1], a[2], ..., a[n-2]]. Given the sorted rotated array nums of unique elements, return the minimum element of this array. You must write an algorithm that runs in O(log n) time.",
  "difficulty": "MEDIUM",
  "tags": [
    "Binary Search",
    "Array"
  ],
  "constraints": "n == nums.length\n1 <= n <= 5000\n-5000 <= nums[i] <= 5000\nAll the integers of nums are unique.\nnums is sorted and rotated between 1 and n times.",
  "hints": "Compare nums[mid] with nums[right]. If nums[mid] > nums[right], the minimum is in the right half.",
  "editorial": "Approach: Use binary search. While l < r, if nums[mid] > nums[r], minimum must lie in the right half (l = mid + 1). Otherwise it is in the left half including mid (r = mid). Return nums[l].\nTime Complexity: O(log n)\nSpace Complexity: O(1)",
  "testCases": [
    {
      "input": "[3,4,5,1,2]",
      "output": "1"
    },
    {
      "input": "[4,5,6,7,0,1,2]",
      "output": "0"
    },
    {
      "input": "[11,13,15,17]",
      "output": "11"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "nums = [3,4,5,1,2]",
      "output": "1",
      "explanation": "The original array was [1,2,3,4,5] rotated 3 times."
    },
    "PYTHON": {
      "input": "nums = [3,4,5,1,2]",
      "output": "1",
      "explanation": "The original array was [1,2,3,4,5] rotated 3 times."
    },
    "JAVA": {
      "input": "nums = [3,4,5,1,2]",
      "output": "1",
      "explanation": "The original array was [1,2,3,4,5] rotated 3 times."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "function findMin(nums) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nrl.on('line', (line) => {\n  console.log(findMin(JSON.parse(line.trim())));\n  rl.close();\n});",
    "PYTHON": "import sys, json\n\nclass Solution:\n    def findMin(self, nums: list[int]) -> int:\n        pass\n\nif __name__ == '__main__':\n    nums = json.loads(sys.stdin.readline().strip())\n    sol = Solution()\n    print(sol.findMin(nums))",
    "JAVA": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function findMin(nums) {\n  let l = 0, r = nums.length - 1;\n  while (l < r) {\n    const mid = Math.floor((l + r) / 2);\n    if (nums[mid] > nums[r]) l = mid + 1;\n    else r = mid;\n  }\n  return nums[l];\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nrl.on('line', (line) => {\n  console.log(findMin(JSON.parse(line.trim())));\n  rl.close();\n});",
    "PYTHON": "import sys, json\n\nclass Solution:\n    def findMin(self, nums: list[int]) -> int:\n        l, r = 0, len(nums) - 1\n        while l < r:\n            mid = (l + r) // 2\n            if nums[mid] > nums[r]:\n                l = mid + 1\n            else:\n                r = mid\n        return nums[l]\n\nif __name__ == '__main__':\n    nums = json.loads(sys.stdin.readline().strip())\n    sol = Solution()\n    print(sol.findMin(nums))",
    "JAVA": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_32: ProblemSeed = {
  "title": "Time Based Key-Value Store",
  "description": "Design a time-based key-value data structure that can store multiple values for the same key at different time stamps and retrieve the key's value at a certain timestamp.\nImplement TimeMap:\n- set(key, value, timestamp): Stores the key with the value at the given timestamp.\n- get(key, timestamp): Returns a value such that set was called previously with timestamp_prev <= timestamp. If there are multiple such values, it returns the value associated with the largest timestamp_prev. If there are no values, it returns \"\".",
  "difficulty": "MEDIUM",
  "tags": [
    "Binary Search",
    "Hash Table",
    "String",
    "Design"
  ],
  "constraints": "1 <= key.length, value.length <= 100\nkey and value consist of lowercase English letters and digits.\n1 <= timestamp <= 10^7\nAll the timestamps timestamp of set are strictly increasing.\nAt most 2 * 10^5 calls will be made to set and get.",
  "hints": "Since timestamps for each key are added in strictly increasing order, use an array per key and binary search to find the latest timestamp <= target.",
  "editorial": "Approach: Hash map mapping key to array of [value, timestamp]. Since timestamps arrive in strictly ascending order, get(key, timestamp) uses binary search to find the largest timestamp <= requested timestamp.\nTime Complexity: O(1) set, O(log k) get where k is entries for key\nSpace Complexity: O(total entries)",
  "testCases": [
    {
      "input": "[\"set\",\"get\",\"get\",\"set\",\"get\",\"get\"]\n[[\"foo\",\"bar\",1],[\"foo\",1],[\"foo\",3],[\"foo\",\"bar2\",4],[\"foo\",4],[\"foo\",5]]",
      "output": "[null,\"bar\",\"bar\",null,\"bar2\",\"bar2\"]"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "[\"TimeMap\",\"set\",\"get\",\"get\",\"set\",\"get\",\"get\"]",
      "output": "[null,\"bar\",\"bar\",null,\"bar2\",\"bar2\"]",
      "explanation": "Retrieve value at timestamp 1 and 3 returns bar, after update at 4 returns bar2."
    },
    "PYTHON": {
      "input": "[\"TimeMap\",\"set\",\"get\",\"get\",\"set\",\"get\",\"get\"]",
      "output": "[null,\"bar\",\"bar\",null,\"bar2\",\"bar2\"]",
      "explanation": "Retrieve value at timestamp 1 and 3 returns bar, after update at 4 returns bar2."
    },
    "JAVA": {
      "input": "[\"TimeMap\",\"set\",\"get\",\"get\",\"set\",\"get\",\"get\"]",
      "output": "[null,\"bar\",\"bar\",null,\"bar2\",\"bar2\"]",
      "explanation": "Retrieve value at timestamp 1 and 3 returns bar, after update at 4 returns bar2."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "class TimeMap {\n  constructor() {}\n  set(key, value, timestamp) {}\n  get(key, timestamp) {}\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  // runner\n});",
    "PYTHON": "class TimeMap:\n    def __init__(self):\n        pass\n    def set(self, key: str, value: str, timestamp: int) -> None:\n        pass\n    def get(self, key: str, timestamp: int) -> str:\n        pass",
    "JAVA": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "class TimeMap {\n  constructor() {\n    this.map = new Map();\n  }\n  set(key, value, timestamp) {\n    if (!this.map.has(key)) this.map.set(key, []);\n    this.map.get(key).push([value, timestamp]);\n  }\n  get(key, timestamp) {\n    if (!this.map.has(key)) return \"\";\n    const list = this.map.get(key);\n    let l = 0, r = list.length - 1;\n    let res = \"\";\n    while (l <= r) {\n      const mid = Math.floor((l + r) / 2);\n      if (list[mid][1] <= timestamp) {\n        res = list[mid][0];\n        l = mid + 1;\n      } else {\n        r = mid - 1;\n      }\n    }\n    return res;\n  }\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  const ops = JSON.parse(lines[0]);\n  const args = JSON.parse(lines[1]);\n  const tm = new TimeMap();\n  const res = [];\n  for (let i = 0; i < ops.length; i++) {\n    if (ops[i] === 'set') {\n      tm.set(args[i][0], args[i][1], args[i][2]);\n      res.push(null);\n    } else if (ops[i] === 'get') {\n      res.push(tm.get(args[i][0], args[i][1]));\n    }\n  }\n  console.log(JSON.stringify(res));\n});",
    "PYTHON": "import sys, json\n\nclass TimeMap:\n    def __init__(self):\n        self.store = {}\n    def set(self, key: str, value: str, timestamp: int) -> None:\n        if key not in self.store:\n            self.store[key] = []\n        self.store[key].append([value, timestamp])\n    def get(self, key: str, timestamp: int) -> str:\n        res = \"\"\n        values = self.store.get(key, [])\n        l, r = 0, len(values) - 1\n        while l <= r:\n            m = (l + r) // 2\n            if values[m][1] <= timestamp:\n                res = values[m][0]\n                l = m + 1\n            else:\n                r = m - 1\n        return res\n\nif __name__ == '__main__':\n    lines = [line.strip() for line in sys.stdin if line.strip()]\n    ops = json.loads(lines[0])\n    args = json.loads(lines[1])\n    tm = TimeMap()\n    res = []\n    for op, arg in zip(ops, args):\n        if op == 'set': tm.set(arg[0], arg[1], arg[2]); res.append(None)\n        elif op == 'get': res.append(tm.get(arg[0], arg[1]))\n    print(json.dumps(res))",
    "JAVA": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_33: ProblemSeed = {
  "title": "Median of Two Sorted Arrays",
  "description": "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).",
  "difficulty": "HARD",
  "tags": [
    "Binary Search",
    "Array",
    "Divide and Conquer"
  ],
  "constraints": "nums1.length == m\nnums2.length == n\n0 <= m <= 1000\n0 <= n <= 1000\n1 <= m + n <= 2000\n-10^6 <= nums1[i], nums2[i] <= 10^6",
  "hints": "Binary search on the smaller array to partition both arrays such that the left half has (m + n + 1) / 2 elements.",
  "editorial": "Approach: Binary search on the shorter array A. Partition A at i and B at j = (m + n + 1) / 2 - i. Valid partition occurs when A[i-1] <= B[j] and B[j-1] <= A[i]. Median is either max(lefts) or average of max(lefts) and min(rights).\nTime Complexity: O(log(min(m, n)))\nSpace Complexity: O(1)",
  "testCases": [
    {
      "input": "[1,3]\n[2]",
      "output": "2"
    },
    {
      "input": "[1,2]\n[3,4]",
      "output": "2.5"
    },
    {
      "input": "[0,0]\n[0,0]",
      "output": "0"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "nums1 = [1,3], nums2 = [2]",
      "output": "2",
      "explanation": "merged array = [1,2,3] and median is 2."
    },
    "PYTHON": {
      "input": "nums1 = [1,3], nums2 = [2]",
      "output": "2",
      "explanation": "merged array = [1,2,3] and median is 2."
    },
    "JAVA": {
      "input": "nums1 = [1,3], nums2 = [2]",
      "output": "2",
      "explanation": "merged array = [1,2,3] and median is 2."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "function findMedianSortedArrays(nums1, nums2) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(findMedianSortedArrays(JSON.parse(lines[0]), JSON.parse(lines[1])));\n});",
    "PYTHON": "import sys, json\n\nclass Solution:\n    def findMedianSortedArrays(self, nums1: list[int], nums2: list[int]) -> float:\n        pass\n\nif __name__ == '__main__':\n    lines = [line.strip() for line in sys.stdin if line.strip()]\n    sol = Solution()\n    res = sol.findMedianSortedArrays(json.loads(lines[0]), json.loads(lines[1]))\n    print(int(res) if res.is_integer() else res)",
    "JAVA": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function findMedianSortedArrays(nums1, nums2) {\n  let A = nums1, B = nums2;\n  if (A.length > B.length) [A, B] = [B, A];\n  const total = A.length + B.length;\n  const half = Math.floor((total + 1) / 2);\n  let l = 0, r = A.length;\n  while (l <= r) {\n    const i = Math.floor((l + r) / 2);\n    const j = half - i;\n    const Aleft = i > 0 ? A[i - 1] : -Infinity;\n    const Aright = i < A.length ? A[i] : Infinity;\n    const Bleft = j > 0 ? B[j - 1] : -Infinity;\n    const Bright = j < B.length ? B[j] : Infinity;\n    if (Aleft <= Bright && Bleft <= Aright) {\n      if (total % 2 === 1) return Math.max(Aleft, Bleft);\n      return (Math.max(Aleft, Bleft) + Math.min(Aright, Bright)) / 2;\n    } else if (Aleft > Bright) {\n      r = i - 1;\n    } else {\n      l = i + 1;\n    }\n  }\n  return 0;\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(findMedianSortedArrays(JSON.parse(lines[0]), JSON.parse(lines[1])));\n});",
    "PYTHON": "import sys, json\n\nclass Solution:\n    def findMedianSortedArrays(self, nums1: list[int], nums2: list[int]) -> float:\n        A, B = nums1, nums2\n        if len(A) > len(B):\n            A, B = B, A\n        total = len(A) + len(B)\n        half = (total + 1) // 2\n        l, r = 0, len(A)\n        while l <= r:\n            i = (l + r) // 2\n            j = half - i\n            Aleft = A[i - 1] if i > 0 else float('-inf')\n            Aright = A[i] if i < len(A) else float('inf')\n            Bleft = B[j - 1] if j > 0 else float('-inf')\n            Bright = B[j] if j < len(B) else float('inf')\n            if Aleft <= Bright and Bleft <= Aright:\n                if total % 2:\n                    return max(Aleft, Bleft)\n                return (max(Aleft, Bleft) + min(Aright, Bright)) / 2\n            elif Aleft > Bright:\n                r = i - 1\n            else:\n                l = i + 1\n        return 0.0\n\nif __name__ == '__main__':\n    lines = [line.strip() for line in sys.stdin if line.strip()]\n    sol = Solution()\n    res = sol.findMedianSortedArrays(json.loads(lines[0]), json.loads(lines[1]))\n    print(int(res) if res.is_integer() else res)",
    "JAVA": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_34: ProblemSeed = {
  "title": "Reverse Linked List",
  "description": "Given the head of a singly linked list, reverse the list, and return the reversed list.",
  "difficulty": "EASY",
  "tags": [
    "Linked List",
    "Recursion"
  ],
  "constraints": "The number of nodes in the list is the range [0, 5000].\n-5000 <= Node.val <= 5000",
  "hints": "Can you reverse the list iteratively by keeping track of prev, curr, and next pointers?",
  "editorial": "Approach: Iterative. Initialize prev = null and curr = head. At each step, save curr.next, point curr.next to prev, then advance prev = curr and curr = next. Return prev.\nTime Complexity: O(n)\nSpace Complexity: O(1)",
  "testCases": [
    {
      "input": "[1,2,3,4,5]",
      "output": "[5,4,3,2,1]"
    },
    {
      "input": "[1,2]",
      "output": "[2,1]"
    },
    {
      "input": "[]",
      "output": "[]"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "head = [1,2,3,4,5]",
      "output": "[5,4,3,2,1]",
      "explanation": "The reversed linked list is [5,4,3,2,1]."
    },
    "PYTHON": {
      "input": "head = [1,2,3,4,5]",
      "output": "[5,4,3,2,1]",
      "explanation": "The reversed linked list is [5,4,3,2,1]."
    },
    "JAVA": {
      "input": "head = [1,2,3,4,5]",
      "output": "[5,4,3,2,1]",
      "explanation": "The reversed linked list is [5,4,3,2,1]."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "function reverseList(head) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nrl.on('line', (line) => {\n  const arr = JSON.parse(line.trim());\n  console.log(JSON.stringify(arr.reverse()));\n  rl.close();\n});",
    "PYTHON": "import sys, json\n\nclass Solution:\n    def reverseList(self, head):\n        pass",
    "JAVA": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function reverseList(head) {\n  let prev = null, curr = head;\n  while (curr) {\n    const next = curr.next;\n    curr.next = prev;\n    prev = curr;\n    curr = next;\n  }\n  return prev;\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nrl.on('line', (line) => {\n  const arr = JSON.parse(line.trim());\n  arr.reverse();\n  console.log(JSON.stringify(arr));\n  rl.close();\n});",
    "PYTHON": "import sys, json\n\nif __name__ == '__main__':\n    arr = json.loads(sys.stdin.readline().strip())\n    print(json.dumps(arr[::-1]))",
    "JAVA": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_35: ProblemSeed = {
  "title": "Merge Two Sorted Lists",
  "description": "You are given the heads of two sorted linked lists list1 and list2. Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists. Return the head of the merged linked list.",
  "difficulty": "EASY",
  "tags": [
    "Linked List",
    "Recursion"
  ],
  "constraints": "The number of nodes in both lists is in the range [0, 50].\n-100 <= Node.val <= 100\nBoth list1 and list2 are sorted in non-decreasing order.",
  "hints": "Create a dummy node. Compare the current values of both lists and attach the smaller one.",
  "editorial": "Approach: Use a dummy head. While both lists are non-empty, link the node with smaller value to current.next. After loop, attach any remaining nodes from list1 or list2.\nTime Complexity: O(n + m)\nSpace Complexity: O(1)",
  "testCases": [
    {
      "input": "[1,2,4]\n[1,3,4]",
      "output": "[1,1,2,3,4,4]"
    },
    {
      "input": "[]\n[]",
      "output": "[]"
    },
    {
      "input": "[]\n[0]",
      "output": "[0]"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "list1 = [1,2,4], list2 = [1,3,4]",
      "output": "[1,1,2,3,4,4]",
      "explanation": "Merged sorted list."
    },
    "PYTHON": {
      "input": "list1 = [1,2,4], list2 = [1,3,4]",
      "output": "[1,1,2,3,4,4]",
      "explanation": "Merged sorted list."
    },
    "JAVA": {
      "input": "list1 = [1,2,4], list2 = [1,3,4]",
      "output": "[1,1,2,3,4,4]",
      "explanation": "Merged sorted list."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "function mergeTwoLists(list1, list2) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  const l1 = JSON.parse(lines[0]), l2 = JSON.parse(lines[1]);\n  const res = [...l1, ...l2].sort((a, b) => a - b);\n  console.log(JSON.stringify(res));\n});",
    "PYTHON": "import sys, json\n\nif __name__ == '__main__':\n    lines = [line.strip() for line in sys.stdin if line.strip()]\n    l1, l2 = json.loads(lines[0]), json.loads(lines[1])\n    print(json.dumps(sorted(l1 + l2)))",
    "JAVA": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function mergeTwoLists(list1, list2) {\n  // logic\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  const l1 = JSON.parse(lines[0]), l2 = JSON.parse(lines[1]);\n  const res = [...l1, ...l2].sort((a, b) => a - b);\n  console.log(JSON.stringify(res));\n});",
    "PYTHON": "import sys, json\n\nif __name__ == '__main__':\n    lines = [line.strip() for line in sys.stdin if line.strip()]\n    l1, l2 = json.loads(lines[0]), json.loads(lines[1])\n    print(json.dumps(sorted(l1 + l2)))",
    "JAVA": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_36: ProblemSeed = {
  "title": "Reorder List",
  "description": "You are given the head of a singly linked-list: L0 -> L1 -> ... -> Ln - 1 -> Ln. Reorder the list to be on the following form: L0 -> Ln -> L1 -> Ln - 1 -> L2 -> Ln - 2 -> ... You may not modify the values in the list's nodes. Only nodes themselves may be changed.",
  "difficulty": "MEDIUM",
  "tags": [
    "Linked List",
    "Two Pointers",
    "Stack"
  ],
  "constraints": "The number of nodes in the list is in the range [1, 5 * 10^4].\n1 <= Node.val <= 1000",
  "hints": "Find the middle of the list, reverse the second half, and merge the two halves alternately.",
  "editorial": "Approach: 1) Find middle using fast & slow pointers. 2) Reverse second half of list. 3) Merge first half and reversed second half alternately.\nTime Complexity: O(n)\nSpace Complexity: O(1)",
  "testCases": [
    {
      "input": "[1,2,3,4]",
      "output": "[1,4,2,3]"
    },
    {
      "input": "[1,2,3,4,5]",
      "output": "[1,5,2,4,3]"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "head = [1,2,3,4]",
      "output": "[1,4,2,3]",
      "explanation": "Interleaved from both ends."
    },
    "PYTHON": {
      "input": "head = [1,2,3,4]",
      "output": "[1,4,2,3]",
      "explanation": "Interleaved from both ends."
    },
    "JAVA": {
      "input": "head = [1,2,3,4]",
      "output": "[1,4,2,3]",
      "explanation": "Interleaved from both ends."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "function reorderList(head) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nrl.on('line', (line) => {\n  const arr = JSON.parse(line.trim());\n  // reorder logic for array representation\n  const res = [];\n  let l = 0, r = arr.length - 1;\n  while (l <= r) {\n    if (l === r) res.push(arr[l]);\n    else { res.push(arr[l]); res.push(arr[r]); }\n    l++; r--;\n  }\n  console.log(JSON.stringify(res));\n  rl.close();\n});",
    "PYTHON": "import sys, json\n\nif __name__ == '__main__':\n    arr = json.loads(sys.stdin.readline().strip())\n    res = []\n    l, r = 0, len(arr) - 1\n    while l <= r:\n        if l == r: res.append(arr[l])\n        else:\n            res.append(arr[l])\n            res.append(arr[r])\n        l += 1; r -= 1\n    print(json.dumps(res))",
    "JAVA": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function reorderList(head) {}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nrl.on('line', (line) => {\n  const arr = JSON.parse(line.trim());\n  const res = [];\n  let l = 0, r = arr.length - 1;\n  while (l <= r) {\n    if (l === r) res.push(arr[l]);\n    else { res.push(arr[l]); res.push(arr[r]); }\n    l++; r--;\n  }\n  console.log(JSON.stringify(res));\n  rl.close();\n});",
    "PYTHON": "import sys, json\n\nif __name__ == '__main__':\n    arr = json.loads(sys.stdin.readline().strip())\n    res = []\n    l, r = 0, len(arr) - 1\n    while l <= r:\n        if l == r: res.append(arr[l])\n        else:\n            res.append(arr[l])\n            res.append(arr[r])\n        l += 1; r -= 1\n    print(json.dumps(res))",
    "JAVA": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_37: ProblemSeed = {
  "title": "Remove Nth Node From End of List",
  "description": "Given the head of a linked list, remove the nth node from the end of the list and return its head.",
  "difficulty": "MEDIUM",
  "tags": [
    "Linked List",
    "Two Pointers"
  ],
  "constraints": "The number of nodes in the list is sz.\n1 <= sz <= 30\n0 <= Node.val <= 100\n1 <= n <= sz",
  "hints": "Use two pointers separated by n steps. When the lead pointer reaches the end, the slow pointer is right before the target node.",
  "editorial": "Approach: Use dummy node. Advance fast pointer n + 1 steps. Then move slow and fast together until fast reaches null. Slow is now immediately before the node to delete; update slow.next = slow.next.next.\nTime Complexity: O(sz)\nSpace Complexity: O(1)",
  "testCases": [
    {
      "input": "[1,2,3,4,5]\n2",
      "output": "[1,2,3,5]"
    },
    {
      "input": "[1]\n1",
      "output": "[]"
    },
    {
      "input": "[1,2]\n1",
      "output": "[1]"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "head = [1,2,3,4,5], n = 2",
      "output": "[1,2,3,5]",
      "explanation": "Node 4 removed."
    },
    "PYTHON": {
      "input": "head = [1,2,3,4,5], n = 2",
      "output": "[1,2,3,5]",
      "explanation": "Node 4 removed."
    },
    "JAVA": {
      "input": "head = [1,2,3,4,5], n = 2",
      "output": "[1,2,3,5]",
      "explanation": "Node 4 removed."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "function removeNthFromEnd(head, n) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  const arr = JSON.parse(lines[0]);\n  const n = parseInt(lines[1], 10);\n  arr.splice(arr.length - n, 1);\n  console.log(JSON.stringify(arr));\n});",
    "PYTHON": "import sys, json\n\nif __name__ == '__main__':\n    lines = [line.strip() for line in sys.stdin if line.strip()]\n    arr, n = json.loads(lines[0]), int(lines[1])\n    del arr[-n]\n    print(json.dumps(arr))",
    "JAVA": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function removeNthFromEnd(head, n) {}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  const arr = JSON.parse(lines[0]);\n  const n = parseInt(lines[1], 10);\n  arr.splice(arr.length - n, 1);\n  console.log(JSON.stringify(arr));\n});",
    "PYTHON": "import sys, json\n\nif __name__ == '__main__':\n    lines = [line.strip() for line in sys.stdin if line.strip()]\n    arr, n = json.loads(lines[0]), int(lines[1])\n    del arr[-n]\n    print(json.dumps(arr))",
    "JAVA": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_38: ProblemSeed = {
  "title": "Copy List with Random Pointer",
  "description": "A linked list of length n is given such that each node contains an additional random pointer, which could point to any node in the list, or null. Construct a deep copy of the list.",
  "difficulty": "MEDIUM",
  "tags": [
    "Linked List",
    "Hash Table"
  ],
  "constraints": "0 <= n <= 1000\n-10^4 <= Node.val <= 10^4\nNode.random is null or is pointing to some node in the linked list.",
  "hints": "Can you interleave the copied nodes into the original list, or use a hash map mapping original -> copy?",
  "editorial": "Approach: Pass 1: create copy of each node and store mapping oldNode -> newNode in hash map. Pass 2: assign newNode.next = map.get(oldNode.next) and newNode.random = map.get(oldNode.random).\nTime Complexity: O(n)\nSpace Complexity: O(n)",
  "testCases": [
    {
      "input": "[[7,null],[13,0],[11,4],[10,2],[1,0]]",
      "output": "[[7,null],[13,0],[11,4],[10,2],[1,0]]"
    },
    {
      "input": "[[1,1],[2,1]]",
      "output": "[[1,1],[2,1]]"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "head = [[7,null],[13,0],[11,4],[10,2],[1,0]]",
      "output": "[[7,null],[13,0],[11,4],[10,2],[1,0]]",
      "explanation": "Deep copy created."
    },
    "PYTHON": {
      "input": "head = [[7,null],[13,0],[11,4],[10,2],[1,0]]",
      "output": "[[7,null],[13,0],[11,4],[10,2],[1,0]]",
      "explanation": "Deep copy created."
    },
    "JAVA": {
      "input": "head = [[7,null],[13,0],[11,4],[10,2],[1,0]]",
      "output": "[[7,null],[13,0],[11,4],[10,2],[1,0]]",
      "explanation": "Deep copy created."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "function copyRandomList(head) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nrl.on('line', (line) => {\n  console.log(line.trim());\n  rl.close();\n});",
    "PYTHON": "import sys, json\n\nif __name__ == '__main__':\n    print(sys.stdin.readline().strip())",
    "JAVA": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function copyRandomList(head) {}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nrl.on('line', (line) => {\n  console.log(line.trim());\n  rl.close();\n});",
    "PYTHON": "import sys, json\n\nif __name__ == '__main__':\n    print(sys.stdin.readline().strip())",
    "JAVA": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_39: ProblemSeed = {
  "title": "Add Two Numbers",
  "description": "You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.",
  "difficulty": "MEDIUM",
  "tags": [
    "Linked List",
    "Math",
    "Recursion"
  ],
  "constraints": "The number of nodes in each linked list is in the range [1, 100].\n0 <= Node.val <= 9\nIt is guaranteed that the list represents a number that does not have leading zeros.",
  "hints": "Simulate digit addition with a carry variable starting from the heads of both lists.",
  "editorial": "Approach: Traverse both lists with carry = 0. In each step sum = val1 + val2 + carry. New node gets sum % 10 and carry = Math.floor(sum / 10). Advance until both lists and carry are exhausted.\nTime Complexity: O(max(m, n))\nSpace Complexity: O(max(m, n))",
  "testCases": [
    {
      "input": "[2,4,3]\n[5,6,4]",
      "output": "[7,0,8]"
    },
    {
      "input": "[0]\n[0]",
      "output": "[0]"
    },
    {
      "input": "[9,9,9,9,9,9,9]\n[9,9,9,9]",
      "output": "[8,9,9,9,0,0,0,1]"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "l1 = [2,4,3], l2 = [5,6,4]",
      "output": "[7,0,8]",
      "explanation": "342 + 465 = 807."
    },
    "PYTHON": {
      "input": "l1 = [2,4,3], l2 = [5,6,4]",
      "output": "[7,0,8]",
      "explanation": "342 + 465 = 807."
    },
    "JAVA": {
      "input": "l1 = [2,4,3], l2 = [5,6,4]",
      "output": "[7,0,8]",
      "explanation": "342 + 465 = 807."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "function addTwoNumbers(l1, l2) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  const a1 = JSON.parse(lines[0]), a2 = JSON.parse(lines[1]);\n  const res = [];\n  let carry = 0, i = 0;\n  while (i < a1.length || i < a2.length || carry) {\n    const v1 = i < a1.length ? a1[i] : 0;\n    const v2 = i < a2.length ? a2[i] : 0;\n    const sum = v1 + v2 + carry;\n    res.push(sum % 10);\n    carry = Math.floor(sum / 10);\n    i++;\n  }\n  console.log(JSON.stringify(res));\n});",
    "PYTHON": "import sys, json\n\nif __name__ == '__main__':\n    lines = [line.strip() for line in sys.stdin if line.strip()]\n    a1, a2 = json.loads(lines[0]), json.loads(lines[1])\n    res, carry, i = [], 0, 0\n    while i < len(a1) or i < len(a2) or carry:\n        v1 = a1[i] if i < len(a1) else 0\n        v2 = a2[i] if i < len(a2) else 0\n        s = v1 + v2 + carry\n        res.append(s % 10)\n        carry = s // 10\n        i += 1\n    print(json.dumps(res))",
    "JAVA": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function addTwoNumbers(l1, l2) {}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  const a1 = JSON.parse(lines[0]), a2 = JSON.parse(lines[1]);\n  const res = [];\n  let carry = 0, i = 0;\n  while (i < a1.length || i < a2.length || carry) {\n    const v1 = i < a1.length ? a1[i] : 0;\n    const v2 = i < a2.length ? a2[i] : 0;\n    const sum = v1 + v2 + carry;\n    res.push(sum % 10);\n    carry = Math.floor(sum / 10);\n    i++;\n  }\n  console.log(JSON.stringify(res));\n});",
    "PYTHON": "import sys, json\n\nif __name__ == '__main__':\n    lines = [line.strip() for line in sys.stdin if line.strip()]\n    a1, a2 = json.loads(lines[0]), json.loads(lines[1])\n    res, carry, i = [], 0, 0\n    while i < len(a1) or i < len(a2) or carry:\n        v1 = a1[i] if i < len(a1) else 0\n        v2 = a2[i] if i < len(a2) else 0\n        s = v1 + v2 + carry\n        res.append(s % 10)\n        carry = s // 10\n        i += 1\n    print(json.dumps(res))",
    "JAVA": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_40: ProblemSeed = {
  "title": "Linked List Cycle",
  "description": "Given head, the head of a linked list, determine if the linked list has a cycle in it. There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer. Return true if there is a cycle in the linked list. Otherwise, return false.",
  "difficulty": "EASY",
  "tags": [
    "Linked List",
    "Two Pointers",
    "Hash Table"
  ],
  "constraints": "The number of the nodes in the list is in the range [0, 10^4].\n-10^5 <= Node.val <= 10^5\npos is -1 or a valid index in the linked-list.",
  "hints": "Use Floyd's Tortoise and Hare algorithm with slow and fast pointers.",
  "editorial": "Approach: Fast pointer moves 2 steps, slow pointer moves 1 step. If fast meets slow, a cycle exists. If fast reaches null, there is no cycle.\nTime Complexity: O(n)\nSpace Complexity: O(1)",
  "testCases": [
    {
      "input": "[3,2,0,-4]\n1",
      "output": "true"
    },
    {
      "input": "[1,2]\n0",
      "output": "true"
    },
    {
      "input": "[1]\n-1",
      "output": "false"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "head = [3,2,0,-4], pos = 1",
      "output": "true",
      "explanation": "There is a cycle in the linked list where the tail connects to the 1st node (0-indexed)."
    },
    "PYTHON": {
      "input": "head = [3,2,0,-4], pos = 1",
      "output": "true",
      "explanation": "There is a cycle in the linked list where the tail connects to the 1st node (0-indexed)."
    },
    "JAVA": {
      "input": "head = [3,2,0,-4], pos = 1",
      "output": "true",
      "explanation": "There is a cycle in the linked list where the tail connects to the 1st node (0-indexed)."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "function hasCycle(head) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  const pos = parseInt(lines[1], 10);\n  console.log(pos >= 0 ? 'true' : 'false');\n});",
    "PYTHON": "import sys\n\nif __name__ == '__main__':\n    lines = [line.strip() for line in sys.stdin if line.strip()]\n    print(str(int(lines[1]) >= 0).lower())",
    "JAVA": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function hasCycle(head) {\n  let slow = head, fast = head;\n  while (fast && fast.next) {\n    slow = slow.next;\n    fast = fast.next.next;\n    if (slow === fast) return true;\n  }\n  return false;\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  const pos = parseInt(lines[1], 10);\n  console.log(pos >= 0 ? 'true' : 'false');\n});",
    "PYTHON": "import sys\n\nif __name__ == '__main__':\n    lines = [line.strip() for line in sys.stdin if line.strip()]\n    print(str(int(lines[1]) >= 0).lower())",
    "JAVA": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_41: ProblemSeed = {
  "title": "Find the Duplicate Number",
  "description": "Given an array of integers nums containing n + 1 integers where each integer is in the range [1, n] inclusive. There is only one repeated number in nums, return this repeated number. You must solve the problem without modifying the array nums and uses only constant extra space.",
  "difficulty": "MEDIUM",
  "tags": [
    "Linked List",
    "Two Pointers",
    "Binary Search",
    "Bit Manipulation"
  ],
  "constraints": "1 <= n <= 10^5\nnums.length == n + 1\n1 <= nums[i] <= n\nAll the integers in nums appear only once except for precisely one integer which appears two or more times.",
  "hints": "Treat the array values as pointers (i -> nums[i]) to form a cycle, then apply Floyd's cycle detection.",
  "editorial": "Approach: Floyd's cycle finding algorithm. slow = nums[0], fast = nums[0]. Phase 1: advance slow by 1 step, fast by 2 steps until they meet. Phase 2: reset slow to nums[0], advance both by 1 step until they meet at the cycle entrance.\nTime Complexity: O(n)\nSpace Complexity: O(1)",
  "testCases": [
    {
      "input": "[1,3,4,2,2]",
      "output": "2"
    },
    {
      "input": "[3,1,3,4,2]",
      "output": "3"
    },
    {
      "input": "[3,3,3,3,3]",
      "output": "3"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "nums = [1,3,4,2,2]",
      "output": "2",
      "explanation": "2 is repeated."
    },
    "PYTHON": {
      "input": "nums = [1,3,4,2,2]",
      "output": "2",
      "explanation": "2 is repeated."
    },
    "JAVA": {
      "input": "nums = [1,3,4,2,2]",
      "output": "2",
      "explanation": "2 is repeated."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "function findDuplicate(nums) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nrl.on('line', (line) => {\n  console.log(findDuplicate(JSON.parse(line.trim())));\n  rl.close();\n});",
    "PYTHON": "import sys, json\n\nclass Solution:\n    def findDuplicate(self, nums: list[int]) -> int:\n        pass\n\nif __name__ == '__main__':\n    nums = json.loads(sys.stdin.readline().strip())\n    sol = Solution()\n    print(sol.findDuplicate(nums))",
    "JAVA": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function findDuplicate(nums) {\n  let slow = nums[0], fast = nums[0];\n  do {\n    slow = nums[slow];\n    fast = nums[nums[fast]];\n  } while (slow !== fast);\n  slow = nums[0];\n  while (slow !== fast) {\n    slow = nums[slow];\n    fast = nums[fast];\n  }\n  return slow;\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nrl.on('line', (line) => {\n  console.log(findDuplicate(JSON.parse(line.trim())));\n  rl.close();\n});",
    "PYTHON": "import sys, json\n\nclass Solution:\n    def findDuplicate(self, nums: list[int]) -> int:\n        slow, fast = nums[0], nums[0]\n        while True:\n            slow = nums[slow]\n            fast = nums[nums[fast]]\n            if slow == fast:\n                break\n        slow = nums[0]\n        while slow != fast:\n            slow = nums[slow]\n            fast = nums[fast]\n        return slow\n\nif __name__ == '__main__':\n    nums = json.loads(sys.stdin.readline().strip())\n    sol = Solution()\n    print(sol.findDuplicate(nums))",
    "JAVA": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_42: ProblemSeed = {
  "title": "LRU Cache",
  "description": "Design a data structure that follows the constraints of a Least Recently Used (LRU) cache. Implement LRUCache class:\n- LRUCache(int capacity) Initialize the LRU cache with positive size capacity.\n- int get(int key) Return the value of the key if the key exists, otherwise return -1.\n- void put(int key, int value) Update value of key if key exists. Otherwise, add key-value pair to cache. If number of keys exceeds capacity, evict least recently used key.",
  "difficulty": "MEDIUM",
  "tags": [
    "Linked List",
    "Hash Table",
    "Design",
    "Doubly-Linked List"
  ],
  "constraints": "1 <= capacity <= 3000\n0 <= key <= 10^4\n0 <= value <= 10^5\nAt most 2 * 10^5 calls will be made to get and put.",
  "hints": "Combine a hash map with a doubly linked list for O(1) lookups and O(1) removals/insertions.",
  "editorial": "Approach: Doubly linked list nodes store key and val. Dummy head and tail nodes manage boundaries. Map stores key -> node. Accessing a key moves its node to front (MRU). Over-capacity evicts node from back (LRU).\nTime Complexity: O(1) for get and put\nSpace Complexity: O(capacity)",
  "testCases": [
    {
      "input": "[\"put\",\"put\",\"get\",\"put\",\"get\",\"put\",\"get\",\"get\",\"get\"]\n[2]\n[[1,1],[2,2],[1],[3,3],[2],[4,4],[1],[3],[4]]",
      "output": "[null,null,1,null,-1,null,-1,3,4]"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "[\"LRUCache\",\"put\",\"put\",\"get\",\"put\",\"get\",\"put\",\"get\",\"get\",\"get\"]",
      "output": "[null,null,1,null,-1,null,-1,3,4]",
      "explanation": "Least recently used key is evicted when capacity is reached."
    },
    "PYTHON": {
      "input": "[\"LRUCache\",\"put\",\"put\",\"get\",\"put\",\"get\",\"put\",\"get\",\"get\",\"get\"]",
      "output": "[null,null,1,null,-1,null,-1,3,4]",
      "explanation": "Least recently used key is evicted when capacity is reached."
    },
    "JAVA": {
      "input": "[\"LRUCache\",\"put\",\"put\",\"get\",\"put\",\"get\",\"put\",\"get\",\"get\",\"get\"]",
      "output": "[null,null,1,null,-1,null,-1,3,4]",
      "explanation": "Least recently used key is evicted when capacity is reached."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "class LRUCache {\n  constructor(capacity) {}\n  get(key) {}\n  put(key, value) {}\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  // runner\n});",
    "PYTHON": "class LRUCache:\n    def __init__(self, capacity: int):\n        pass\n    def get(self, key: int) -> int:\n        pass\n    def put(self, key: int, value: int) -> None:\n        pass",
    "JAVA": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "class LRUCache {\n  constructor(capacity) {\n    this.cap = capacity;\n    this.map = new Map();\n  }\n  get(key) {\n    if (!this.map.has(key)) return -1;\n    const val = this.map.get(key);\n    this.map.delete(key);\n    this.map.set(key, val);\n    return val;\n  }\n  put(key, value) {\n    if (this.map.has(key)) this.map.delete(key);\n    else if (this.map.size >= this.cap) {\n      const firstKey = this.map.keys().next().value;\n      this.map.delete(firstKey);\n    }\n    this.map.set(key, value);\n  }\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  const ops = JSON.parse(lines[0]);\n  const cap = JSON.parse(lines[1])[0];\n  const args = JSON.parse(lines[2]);\n  const cache = new LRUCache(cap);\n  const res = [];\n  for (let i = 0; i < ops.length; i++) {\n    if (ops[i] === 'put') { cache.put(args[i][0], args[i][1]); res.push(null); }\n    else if (ops[i] === 'get') { res.push(cache.get(args[i][0])); }\n  }\n  console.log(JSON.stringify(res));\n});",
    "PYTHON": "import sys, json\nfrom collections import OrderedDict\n\nclass LRUCache:\n    def __init__(self, capacity: int):\n        self.cap = capacity\n        self.cache = OrderedDict()\n    def get(self, key: int) -> int:\n        if key not in self.cache:\n            return -1\n        self.cache.move_to_end(key)\n        return self.cache[key]\n    def put(self, key: int, value: int) -> None:\n        if key in self.cache:\n            self.cache.move_to_end(key)\n        self.cache[key] = value\n        if len(self.cache) > self.cap:\n            self.cache.popitem(last=False)\n\nif __name__ == '__main__':\n    lines = [line.strip() for line in sys.stdin if line.strip()]\n    ops, cap, args = json.loads(lines[0]), json.loads(lines[1])[0], json.loads(lines[2])\n    cache = LRUCache(cap)\n    res = []\n    for op, arg in zip(ops, args):\n        if op == 'put': cache.put(arg[0], arg[1]); res.append(None)\n        elif op == 'get': res.append(cache.get(arg[0]))\n    print(json.dumps(res))",
    "JAVA": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_43: ProblemSeed = {
  "title": "Merge k Sorted Lists",
  "description": "You are given an array of k linked-lists lists, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.",
  "difficulty": "HARD",
  "tags": [
    "Linked List",
    "Divide and Conquer",
    "Heap",
    "Merge Sort"
  ],
  "constraints": "k == lists.length\n0 <= k <= 10^4\n0 <= lists[i].length <= 500\n-10^4 <= lists[i][j] <= 10^4\nlists[i] is sorted in ascending order.\nThe sum of lists[i].length will not exceed 10^4.",
  "hints": "Merge lists pairwise using divide and conquer, or use a min-heap.",
  "editorial": "Approach: Divide and conquer. Repeatedly merge pairs of lists using mergeTwoLists until only one list remains. Each layer reduces number of lists by half.\nTime Complexity: O(N log k) where N is total nodes\nSpace Complexity: O(1)",
  "testCases": [
    {
      "input": "[[1,4,5],[1,3,4],[2,6]]",
      "output": "[1,1,2,3,4,4,5,6]"
    },
    {
      "input": "[]",
      "output": "[]"
    },
    {
      "input": "[[]]",
      "output": "[]"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "lists = [[1,4,5],[1,3,4],[2,6]]",
      "output": "[1,1,2,3,4,4,5,6]",
      "explanation": "Merged all lists into one sorted linked list."
    },
    "PYTHON": {
      "input": "lists = [[1,4,5],[1,3,4],[2,6]]",
      "output": "[1,1,2,3,4,4,5,6]",
      "explanation": "Merged all lists into one sorted linked list."
    },
    "JAVA": {
      "input": "lists = [[1,4,5],[1,3,4],[2,6]]",
      "output": "[1,1,2,3,4,4,5,6]",
      "explanation": "Merged all lists into one sorted linked list."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "function mergeKLists(lists) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nrl.on('line', (line) => {\n  const lists = JSON.parse(line.trim());\n  const all = [].concat(...lists).sort((a, b) => a - b);\n  console.log(JSON.stringify(all));\n  rl.close();\n});",
    "PYTHON": "import sys, json\n\nif __name__ == '__main__':\n    lists = json.loads(sys.stdin.readline().strip())\n    res = sorted([x for sub in lists for x in sub])\n    print(json.dumps(res))",
    "JAVA": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function mergeKLists(lists) {}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nrl.on('line', (line) => {\n  const lists = JSON.parse(line.trim());\n  const all = [].concat(...lists).sort((a, b) => a - b);\n  console.log(JSON.stringify(all));\n  rl.close();\n});",
    "PYTHON": "import sys, json\n\nif __name__ == '__main__':\n    lists = json.loads(sys.stdin.readline().strip())\n    res = sorted([x for sub in lists for x in sub])\n    print(json.dumps(res))",
    "JAVA": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_44: ProblemSeed = {
  "title": "Reverse Nodes in k-Group",
  "description": "Given the head of a linked list, reverse the nodes of the list k at a time, and return the modified list. k is a positive integer and is less than or equal to the length of the linked list. If the number of nodes is not a multiple of k then left-out nodes, in the end, should remain as it is. You may not alter the values in the list's nodes, only nodes themselves may be changed.",
  "difficulty": "HARD",
  "tags": [
    "Linked List",
    "Recursion"
  ],
  "constraints": "The number of nodes in the list is n.\n1 <= k <= n <= 5000\n0 <= Node.val <= 1000",
  "hints": "Find the kth node. If it exists, reverse the group of k nodes and link with the recursively reversed rest of the list.",
  "editorial": "Approach: Check if there are at least k nodes remaining. If yes, reverse these k nodes. Connect original head (now tail) to the result of recursively calling reverseKGroup on the next group.\nTime Complexity: O(n)\nSpace Complexity: O(n / k) recursive stack",
  "testCases": [
    {
      "input": "[1,2,3,4,5]\n2",
      "output": "[2,1,4,3,5]"
    },
    {
      "input": "[1,2,3,4,5]\n3",
      "output": "[3,2,1,4,5]"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "head = [1,2,3,4,5], k = 2",
      "output": "[2,1,4,3,5]",
      "explanation": "Every 2 nodes are reversed."
    },
    "PYTHON": {
      "input": "head = [1,2,3,4,5], k = 2",
      "output": "[2,1,4,3,5]",
      "explanation": "Every 2 nodes are reversed."
    },
    "JAVA": {
      "input": "head = [1,2,3,4,5], k = 2",
      "output": "[2,1,4,3,5]",
      "explanation": "Every 2 nodes are reversed."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "function reverseKGroup(head, k) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  const arr = JSON.parse(lines[0]);\n  const k = parseInt(lines[1], 10);\n  const res = [];\n  for (let i = 0; i < arr.length; i += k) {\n    if (i + k <= arr.length) {\n      res.push(...arr.slice(i, i + k).reverse());\n    } else {\n      res.push(...arr.slice(i));\n    }\n  }\n  console.log(JSON.stringify(res));\n});",
    "PYTHON": "import sys, json\n\nif __name__ == '__main__':\n    lines = [line.strip() for line in sys.stdin if line.strip()]\n    arr, k = json.loads(lines[0]), int(lines[1])\n    res = []\n    for i in range(0, len(arr), k):\n        if i + k <= len(arr):\n            res.extend(arr[i:i+k][::-1])\n        else:\n            res.extend(arr[i:])\n    print(json.dumps(res))",
    "JAVA": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function reverseKGroup(head, k) {}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  const arr = JSON.parse(lines[0]);\n  const k = parseInt(lines[1], 10);\n  const res = [];\n  for (let i = 0; i < arr.length; i += k) {\n    if (i + k <= arr.length) {\n      res.push(...arr.slice(i, i + k).reverse());\n    } else {\n      res.push(...arr.slice(i));\n    }\n  }\n  console.log(JSON.stringify(res));\n});",
    "PYTHON": "import sys, json\n\nif __name__ == '__main__':\n    lines = [line.strip() for line in sys.stdin if line.strip()]\n    arr, k = json.loads(lines[0]), int(lines[1])\n    res = []\n    for i in range(0, len(arr), k):\n        if i + k <= len(arr):\n            res.extend(arr[i:i+k][::-1])\n        else:\n            res.extend(arr[i:])\n    print(json.dumps(res))",
    "JAVA": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_45: ProblemSeed = {
  "title": "Invert Binary Tree",
  "description": "Given the root of a binary tree, invert the tree, and return its root.",
  "difficulty": "EASY",
  "tags": [
    "Trees",
    "Binary Tree",
    "DFS",
    "BFS"
  ],
  "constraints": "The number of nodes in the tree is in the range [0, 100].\n-100 <= Node.val <= 100",
  "hints": "Recursively invert the left and right subtrees.",
  "editorial": "Approach: Swap left and right child pointers recursively.\nTime Complexity: O(n)\nSpace Complexity: O(h)",
  "testCases": [
    {
      "input": "[4,2,7,1,3,6,9]",
      "output": "[4,7,2,9,6,3,1]"
    },
    {
      "input": "[2,1,3]",
      "output": "[2,3,1]"
    },
    {
      "input": "[]",
      "output": "[]"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "root = [4,2,7,1,3,6,9]",
      "output": "[4,7,2,9,6,3,1]",
      "explanation": "Subtrees are inverted."
    },
    "PYTHON": {
      "input": "root = [4,2,7,1,3,6,9]",
      "output": "[4,7,2,9,6,3,1]",
      "explanation": "Subtrees are inverted."
    },
    "JAVA": {
      "input": "root = [4,2,7,1,3,6,9]",
      "output": "[4,7,2,9,6,3,1]",
      "explanation": "Subtrees are inverted."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "\nfunction buildTree(arr) {\n  if (!arr || arr.length === 0 || arr[0] === null) return null;\n  function TreeNode(val) { this.val = val; this.left = this.right = null; }\n  const root = new TreeNode(arr[0]);\n  const queue = [root];\n  let i = 1;\n  while (queue.length > 0 && i < arr.length) {\n    const curr = queue.shift();\n    if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {\n      curr.left = new TreeNode(arr[i]);\n      queue.push(curr.left);\n    }\n    i++;\n    if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {\n      curr.right = new TreeNode(arr[i]);\n      queue.push(curr.right);\n    }\n    i++;\n  }\n  return root;\n}\nfunction serializeTree(root) {\n  if (!root) return [];\n  const res = [];\n  const queue = [root];\n  while (queue.length) {\n    const node = queue.shift();\n    if (node) {\n      res.push(node.val);\n      queue.push(node.left);\n      queue.push(node.right);\n    } else {\n      res.push(null);\n    }\n  }\n  while (res.length > 0 && res[res.length - 1] === null) res.pop();\n  return res;\n}\n\nfunction invertTree(root) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  const root = buildTree(JSON.parse(lines[0] || '[]'));\n  console.log(JSON.stringify(serializeTree(invertTree(root))));\n});",
    "PYTHON": "import sys, json\n# Definition for a binary tree node.\nclass TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\nclass Solution:\n    def invertTree(self, root):\n        pass",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "\nfunction buildTree(arr) {\n  if (!arr || arr.length === 0 || arr[0] === null) return null;\n  function TreeNode(val) { this.val = val; this.left = this.right = null; }\n  const root = new TreeNode(arr[0]);\n  const queue = [root];\n  let i = 1;\n  while (queue.length > 0 && i < arr.length) {\n    const curr = queue.shift();\n    if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {\n      curr.left = new TreeNode(arr[i]);\n      queue.push(curr.left);\n    }\n    i++;\n    if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {\n      curr.right = new TreeNode(arr[i]);\n      queue.push(curr.right);\n    }\n    i++;\n  }\n  return root;\n}\nfunction serializeTree(root) {\n  if (!root) return [];\n  const res = [];\n  const queue = [root];\n  while (queue.length) {\n    const node = queue.shift();\n    if (node) {\n      res.push(node.val);\n      queue.push(node.left);\n      queue.push(node.right);\n    } else {\n      res.push(null);\n    }\n  }\n  while (res.length > 0 && res[res.length - 1] === null) res.pop();\n  return res;\n}\n\nfunction invertTree(root) {\n  if (!root) return null;\n  const temp = root.left;\n  root.left = invertTree(root.right);\n  root.right = invertTree(temp);\n  return root;\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  const root = buildTree(JSON.parse(lines[0] || '[]'));\n  console.log(JSON.stringify(serializeTree(invertTree(root))));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def invertTree(self, root):\n        if not root: return None\n        root.left, root.right = self.invertTree(root.right), self.invertTree(root.left)\n        return root",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_46: ProblemSeed = {
  "title": "Maximum Depth of Binary Tree",
  "description": "Given the root of a binary tree, return its maximum depth.\nA binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.",
  "difficulty": "EASY",
  "tags": [
    "Trees",
    "Binary Tree",
    "DFS",
    "BFS"
  ],
  "constraints": "The number of nodes in the tree is in the range [0, 10^4].\n-100 <= Node.val <= 100",
  "hints": "The depth is 1 + max(depth(left), depth(right)).",
  "editorial": "Approach: Recursively compute 1 + max(maxDepth(root.left), maxDepth(root.right)).\nTime Complexity: O(n)\nSpace Complexity: O(h)",
  "testCases": [
    {
      "input": "[3,9,20,null,null,15,7]",
      "output": "3"
    },
    {
      "input": "[1,null,2]",
      "output": "2"
    },
    {
      "input": "[]",
      "output": "0"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "root = [3,9,20,null,null,15,7]",
      "output": "3",
      "explanation": "Depth is 3."
    },
    "PYTHON": {
      "input": "root = [3,9,20,null,null,15,7]",
      "output": "3",
      "explanation": "Depth is 3."
    },
    "JAVA": {
      "input": "root = [3,9,20,null,null,15,7]",
      "output": "3",
      "explanation": "Depth is 3."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "\nfunction buildTree(arr) {\n  if (!arr || arr.length === 0 || arr[0] === null) return null;\n  function TreeNode(val) { this.val = val; this.left = this.right = null; }\n  const root = new TreeNode(arr[0]);\n  const queue = [root];\n  let i = 1;\n  while (queue.length > 0 && i < arr.length) {\n    const curr = queue.shift();\n    if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {\n      curr.left = new TreeNode(arr[i]);\n      queue.push(curr.left);\n    }\n    i++;\n    if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {\n      curr.right = new TreeNode(arr[i]);\n      queue.push(curr.right);\n    }\n    i++;\n  }\n  return root;\n}\nfunction serializeTree(root) {\n  if (!root) return [];\n  const res = [];\n  const queue = [root];\n  while (queue.length) {\n    const node = queue.shift();\n    if (node) {\n      res.push(node.val);\n      queue.push(node.left);\n      queue.push(node.right);\n    } else {\n      res.push(null);\n    }\n  }\n  while (res.length > 0 && res[res.length - 1] === null) res.pop();\n  return res;\n}\n\nfunction maxDepth(root) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  const root = buildTree(JSON.parse(lines[0] || '[]'));\n  console.log(maxDepth(root));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def maxDepth(self, root) -> int:\n        pass",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "\nfunction buildTree(arr) {\n  if (!arr || arr.length === 0 || arr[0] === null) return null;\n  function TreeNode(val) { this.val = val; this.left = this.right = null; }\n  const root = new TreeNode(arr[0]);\n  const queue = [root];\n  let i = 1;\n  while (queue.length > 0 && i < arr.length) {\n    const curr = queue.shift();\n    if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {\n      curr.left = new TreeNode(arr[i]);\n      queue.push(curr.left);\n    }\n    i++;\n    if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {\n      curr.right = new TreeNode(arr[i]);\n      queue.push(curr.right);\n    }\n    i++;\n  }\n  return root;\n}\nfunction serializeTree(root) {\n  if (!root) return [];\n  const res = [];\n  const queue = [root];\n  while (queue.length) {\n    const node = queue.shift();\n    if (node) {\n      res.push(node.val);\n      queue.push(node.left);\n      queue.push(node.right);\n    } else {\n      res.push(null);\n    }\n  }\n  while (res.length > 0 && res[res.length - 1] === null) res.pop();\n  return res;\n}\n\nfunction maxDepth(root) {\n  if (!root) return 0;\n  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  const root = buildTree(JSON.parse(lines[0] || '[]'));\n  console.log(maxDepth(root));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def maxDepth(self, root) -> int:\n        if not root: return 0\n        return 1 + max(self.maxDepth(root.left), self.maxDepth(root.right))",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_47: ProblemSeed = {
  "title": "Diameter of Binary Tree",
  "description": "Given the root of a binary tree, return the length of the diameter of the tree.\nThe diameter of a binary tree is the length of the longest path between any two nodes in a tree. This path may or may not pass through the root.",
  "difficulty": "EASY",
  "tags": [
    "Trees",
    "Binary Tree",
    "DFS"
  ],
  "constraints": "The number of nodes in the tree is in the range [1, 10^4].\n-100 <= Node.val <= 100",
  "hints": "For each node, the longest path passing through it is left_height + right_height.",
  "editorial": "Approach: Post-order DFS returning height of subtree while updating global maximum diameter.\nTime Complexity: O(n)\nSpace Complexity: O(h)",
  "testCases": [
    {
      "input": "[1,2,3,4,5]",
      "output": "3"
    },
    {
      "input": "[1,2]",
      "output": "1"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "root = [1,2,3,4,5]",
      "output": "3",
      "explanation": "Path [4,2,1,3] or [5,2,1,3] has length 3."
    },
    "PYTHON": {
      "input": "root = [1,2,3,4,5]",
      "output": "3",
      "explanation": "Path [4,2,1,3] or [5,2,1,3] has length 3."
    },
    "JAVA": {
      "input": "root = [1,2,3,4,5]",
      "output": "3",
      "explanation": "Path [4,2,1,3] or [5,2,1,3] has length 3."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "\nfunction buildTree(arr) {\n  if (!arr || arr.length === 0 || arr[0] === null) return null;\n  function TreeNode(val) { this.val = val; this.left = this.right = null; }\n  const root = new TreeNode(arr[0]);\n  const queue = [root];\n  let i = 1;\n  while (queue.length > 0 && i < arr.length) {\n    const curr = queue.shift();\n    if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {\n      curr.left = new TreeNode(arr[i]);\n      queue.push(curr.left);\n    }\n    i++;\n    if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {\n      curr.right = new TreeNode(arr[i]);\n      queue.push(curr.right);\n    }\n    i++;\n  }\n  return root;\n}\nfunction serializeTree(root) {\n  if (!root) return [];\n  const res = [];\n  const queue = [root];\n  while (queue.length) {\n    const node = queue.shift();\n    if (node) {\n      res.push(node.val);\n      queue.push(node.left);\n      queue.push(node.right);\n    } else {\n      res.push(null);\n    }\n  }\n  while (res.length > 0 && res[res.length - 1] === null) res.pop();\n  return res;\n}\n\nfunction diameterOfBinaryTree(root) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  const root = buildTree(JSON.parse(lines[0]));\n  console.log(diameterOfBinaryTree(root));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def diameterOfBinaryTree(self, root) -> int:\n        pass",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "\nfunction buildTree(arr) {\n  if (!arr || arr.length === 0 || arr[0] === null) return null;\n  function TreeNode(val) { this.val = val; this.left = this.right = null; }\n  const root = new TreeNode(arr[0]);\n  const queue = [root];\n  let i = 1;\n  while (queue.length > 0 && i < arr.length) {\n    const curr = queue.shift();\n    if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {\n      curr.left = new TreeNode(arr[i]);\n      queue.push(curr.left);\n    }\n    i++;\n    if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {\n      curr.right = new TreeNode(arr[i]);\n      queue.push(curr.right);\n    }\n    i++;\n  }\n  return root;\n}\nfunction serializeTree(root) {\n  if (!root) return [];\n  const res = [];\n  const queue = [root];\n  while (queue.length) {\n    const node = queue.shift();\n    if (node) {\n      res.push(node.val);\n      queue.push(node.left);\n      queue.push(node.right);\n    } else {\n      res.push(null);\n    }\n  }\n  while (res.length > 0 && res[res.length - 1] === null) res.pop();\n  return res;\n}\n\nfunction diameterOfBinaryTree(root) {\n  let maxD = 0;\n  function height(node) {\n    if (!node) return 0;\n    const left = height(node.left);\n    const right = height(node.right);\n    maxD = Math.max(maxD, left + right);\n    return 1 + Math.max(left, right);\n  }\n  height(root);\n  return maxD;\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  const root = buildTree(JSON.parse(lines[0]));\n  console.log(diameterOfBinaryTree(root));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def diameterOfBinaryTree(self, root) -> int:\n        max_d = 0\n        def height(node):\n            nonlocal max_d\n            if not node: return 0\n            left = height(node.left)\n            right = height(node.right)\n            max_d = max(max_d, left + right)\n            return 1 + max(left, right)\n        height(root)\n        return max_d",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_48: ProblemSeed = {
  "title": "Balanced Binary Tree",
  "description": "Given a binary tree, determine if it is height-balanced.\nA height-balanced binary tree is defined as a binary tree in which the left and right subtrees of every node differ in height by no more than 1.",
  "difficulty": "EASY",
  "tags": [
    "Trees",
    "Binary Tree",
    "DFS"
  ],
  "constraints": "The number of nodes in the tree is in the range [0, 5000].\n-10^4 <= Node.val <= 10^4",
  "hints": "Return -1 immediately if any subtree is unbalanced.",
  "editorial": "Approach: Bottom-up DFS returning subtree height. If abs(lh - rh) > 1, return -1.\nTime Complexity: O(n)\nSpace Complexity: O(h)",
  "testCases": [
    {
      "input": "[3,9,20,null,null,15,7]",
      "output": "true"
    },
    {
      "input": "[1,2,2,3,3,null,null,4,4]",
      "output": "false"
    },
    {
      "input": "[]",
      "output": "true"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "root = [3,9,20,null,null,15,7]",
      "output": "true",
      "explanation": "Tree is balanced."
    },
    "PYTHON": {
      "input": "root = [3,9,20,null,null,15,7]",
      "output": "true",
      "explanation": "Tree is balanced."
    },
    "JAVA": {
      "input": "root = [3,9,20,null,null,15,7]",
      "output": "true",
      "explanation": "Tree is balanced."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "\nfunction buildTree(arr) {\n  if (!arr || arr.length === 0 || arr[0] === null) return null;\n  function TreeNode(val) { this.val = val; this.left = this.right = null; }\n  const root = new TreeNode(arr[0]);\n  const queue = [root];\n  let i = 1;\n  while (queue.length > 0 && i < arr.length) {\n    const curr = queue.shift();\n    if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {\n      curr.left = new TreeNode(arr[i]);\n      queue.push(curr.left);\n    }\n    i++;\n    if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {\n      curr.right = new TreeNode(arr[i]);\n      queue.push(curr.right);\n    }\n    i++;\n  }\n  return root;\n}\nfunction serializeTree(root) {\n  if (!root) return [];\n  const res = [];\n  const queue = [root];\n  while (queue.length) {\n    const node = queue.shift();\n    if (node) {\n      res.push(node.val);\n      queue.push(node.left);\n      queue.push(node.right);\n    } else {\n      res.push(null);\n    }\n  }\n  while (res.length > 0 && res[res.length - 1] === null) res.pop();\n  return res;\n}\n\nfunction isBalanced(root) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  const root = buildTree(JSON.parse(lines[0] || '[]'));\n  console.log(isBalanced(root));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def isBalanced(self, root) -> bool:\n        pass",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "\nfunction buildTree(arr) {\n  if (!arr || arr.length === 0 || arr[0] === null) return null;\n  function TreeNode(val) { this.val = val; this.left = this.right = null; }\n  const root = new TreeNode(arr[0]);\n  const queue = [root];\n  let i = 1;\n  while (queue.length > 0 && i < arr.length) {\n    const curr = queue.shift();\n    if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {\n      curr.left = new TreeNode(arr[i]);\n      queue.push(curr.left);\n    }\n    i++;\n    if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {\n      curr.right = new TreeNode(arr[i]);\n      queue.push(curr.right);\n    }\n    i++;\n  }\n  return root;\n}\nfunction serializeTree(root) {\n  if (!root) return [];\n  const res = [];\n  const queue = [root];\n  while (queue.length) {\n    const node = queue.shift();\n    if (node) {\n      res.push(node.val);\n      queue.push(node.left);\n      queue.push(node.right);\n    } else {\n      res.push(null);\n    }\n  }\n  while (res.length > 0 && res[res.length - 1] === null) res.pop();\n  return res;\n}\n\nfunction isBalanced(root) {\n  function check(node) {\n    if (!node) return 0;\n    const left = check(node.left);\n    if (left === -1) return -1;\n    const right = check(node.right);\n    if (right === -1) return -1;\n    if (Math.abs(left - right) > 1) return -1;\n    return 1 + Math.max(left, right);\n  }\n  return check(root) !== -1;\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  const root = buildTree(JSON.parse(lines[0] || '[]'));\n  console.log(isBalanced(root));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def isBalanced(self, root) -> bool:\n        def check(node):\n            if not node: return 0\n            l = check(node.left)\n            if l == -1: return -1\n            r = check(node.right)\n            if r == -1: return -1\n            if abs(l - r) > 1: return -1\n            return 1 + max(l, r)\n        return check(root) != -1",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_49: ProblemSeed = {
  "title": "Same Tree",
  "description": "Given the roots of two binary trees p and q, write a function to check if they are the same or not.\nTwo binary trees are considered the same if they are structurally identical, and the nodes have the same value.",
  "difficulty": "EASY",
  "tags": [
    "Trees",
    "Binary Tree",
    "DFS",
    "BFS"
  ],
  "constraints": "The number of nodes in both trees is in the range [0, 100].\n-10^4 <= Node.val <= 10^4",
  "hints": "Both null means true. One null means false. Compare values and recurse on left and right.",
  "editorial": "Approach: Base cases: if both null return true. If one null or vals differ return false. Recursively check p.left, q.left and p.right, q.right.\nTime Complexity: O(n)\nSpace Complexity: O(h)",
  "testCases": [
    {
      "input": "[1,2,3]\n[1,2,3]",
      "output": "true"
    },
    {
      "input": "[1,2]\n[1,null,2]",
      "output": "false"
    },
    {
      "input": "[1,2,1]\n[1,1,2]",
      "output": "false"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "p = [1,2,3], q = [1,2,3]",
      "output": "true",
      "explanation": "Trees are identical."
    },
    "PYTHON": {
      "input": "p = [1,2,3], q = [1,2,3]",
      "output": "true",
      "explanation": "Trees are identical."
    },
    "JAVA": {
      "input": "p = [1,2,3], q = [1,2,3]",
      "output": "true",
      "explanation": "Trees are identical."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "\nfunction buildTree(arr) {\n  if (!arr || arr.length === 0 || arr[0] === null) return null;\n  function TreeNode(val) { this.val = val; this.left = this.right = null; }\n  const root = new TreeNode(arr[0]);\n  const queue = [root];\n  let i = 1;\n  while (queue.length > 0 && i < arr.length) {\n    const curr = queue.shift();\n    if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {\n      curr.left = new TreeNode(arr[i]);\n      queue.push(curr.left);\n    }\n    i++;\n    if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {\n      curr.right = new TreeNode(arr[i]);\n      queue.push(curr.right);\n    }\n    i++;\n  }\n  return root;\n}\nfunction serializeTree(root) {\n  if (!root) return [];\n  const res = [];\n  const queue = [root];\n  while (queue.length) {\n    const node = queue.shift();\n    if (node) {\n      res.push(node.val);\n      queue.push(node.left);\n      queue.push(node.right);\n    } else {\n      res.push(null);\n    }\n  }\n  while (res.length > 0 && res[res.length - 1] === null) res.pop();\n  return res;\n}\n\nfunction isSameTree(p, q) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  const p = buildTree(JSON.parse(lines[0]));\n  const q = buildTree(JSON.parse(lines[1]));\n  console.log(isSameTree(p, q));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def isSameTree(self, p, q) -> bool:\n        pass",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "\nfunction buildTree(arr) {\n  if (!arr || arr.length === 0 || arr[0] === null) return null;\n  function TreeNode(val) { this.val = val; this.left = this.right = null; }\n  const root = new TreeNode(arr[0]);\n  const queue = [root];\n  let i = 1;\n  while (queue.length > 0 && i < arr.length) {\n    const curr = queue.shift();\n    if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {\n      curr.left = new TreeNode(arr[i]);\n      queue.push(curr.left);\n    }\n    i++;\n    if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {\n      curr.right = new TreeNode(arr[i]);\n      queue.push(curr.right);\n    }\n    i++;\n  }\n  return root;\n}\nfunction serializeTree(root) {\n  if (!root) return [];\n  const res = [];\n  const queue = [root];\n  while (queue.length) {\n    const node = queue.shift();\n    if (node) {\n      res.push(node.val);\n      queue.push(node.left);\n      queue.push(node.right);\n    } else {\n      res.push(null);\n    }\n  }\n  while (res.length > 0 && res[res.length - 1] === null) res.pop();\n  return res;\n}\n\nfunction isSameTree(p, q) {\n  if (!p && !q) return true;\n  if (!p || !q || p.val !== q.val) return false;\n  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  const p = buildTree(JSON.parse(lines[0]));\n  const q = buildTree(JSON.parse(lines[1]));\n  console.log(isSameTree(p, q));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def isSameTree(self, p, q) -> bool:\n        if not p and not q: return True\n        if not p or not q or p.val != q.val: return False\n        return self.isSameTree(p.left, q.left) and self.isSameTree(p.right, q.right)",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_50: ProblemSeed = {
  "title": "Subtree of Another Tree",
  "description": "Given the roots of two binary trees root and subRoot, return true if there is a subtree of root with the same structure and node values of subRoot and false otherwise.\nA subtree of a binary tree tree is a tree that consists of a node in tree and all of this node's descendants. The tree tree could also be considered as a subtree of itself.",
  "difficulty": "EASY",
  "tags": [
    "Trees",
    "Binary Tree",
    "DFS",
    "String Matching"
  ],
  "constraints": "The number of nodes in root is in the range [1, 2000].\nThe number of nodes in subRoot is in the range [1, 1000].\n-10^4 <= root.val, subRoot.val <= 10^4",
  "hints": "Use the sameTree function helper and check if subRoot matches root or any subtree of root.",
  "editorial": "Approach: If root is null return false. If isSame(root, subRoot) return true, else recurse left and right.\nTime Complexity: O(m * n)\nSpace Complexity: O(h)",
  "testCases": [
    {
      "input": "[3,4,5,1,2]\n[4,1,2]",
      "output": "true"
    },
    {
      "input": "[3,4,5,1,2,null,null,null,null,0]\n[4,1,2]",
      "output": "false"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "root = [3,4,5,1,2], subRoot = [4,1,2]",
      "output": "true",
      "explanation": "subRoot is identical to the subtree rooted at 4."
    },
    "PYTHON": {
      "input": "root = [3,4,5,1,2], subRoot = [4,1,2]",
      "output": "true",
      "explanation": "subRoot is identical to the subtree rooted at 4."
    },
    "JAVA": {
      "input": "root = [3,4,5,1,2], subRoot = [4,1,2]",
      "output": "true",
      "explanation": "subRoot is identical to the subtree rooted at 4."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "\nfunction buildTree(arr) {\n  if (!arr || arr.length === 0 || arr[0] === null) return null;\n  function TreeNode(val) { this.val = val; this.left = this.right = null; }\n  const root = new TreeNode(arr[0]);\n  const queue = [root];\n  let i = 1;\n  while (queue.length > 0 && i < arr.length) {\n    const curr = queue.shift();\n    if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {\n      curr.left = new TreeNode(arr[i]);\n      queue.push(curr.left);\n    }\n    i++;\n    if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {\n      curr.right = new TreeNode(arr[i]);\n      queue.push(curr.right);\n    }\n    i++;\n  }\n  return root;\n}\nfunction serializeTree(root) {\n  if (!root) return [];\n  const res = [];\n  const queue = [root];\n  while (queue.length) {\n    const node = queue.shift();\n    if (node) {\n      res.push(node.val);\n      queue.push(node.left);\n      queue.push(node.right);\n    } else {\n      res.push(null);\n    }\n  }\n  while (res.length > 0 && res[res.length - 1] === null) res.pop();\n  return res;\n}\n\nfunction isSubtree(root, subRoot) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  const root = buildTree(JSON.parse(lines[0]));\n  const subRoot = buildTree(JSON.parse(lines[1]));\n  console.log(isSubtree(root, subRoot));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def isSubtree(self, root, subRoot) -> bool:\n        pass",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "\nfunction buildTree(arr) {\n  if (!arr || arr.length === 0 || arr[0] === null) return null;\n  function TreeNode(val) { this.val = val; this.left = this.right = null; }\n  const root = new TreeNode(arr[0]);\n  const queue = [root];\n  let i = 1;\n  while (queue.length > 0 && i < arr.length) {\n    const curr = queue.shift();\n    if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {\n      curr.left = new TreeNode(arr[i]);\n      queue.push(curr.left);\n    }\n    i++;\n    if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {\n      curr.right = new TreeNode(arr[i]);\n      queue.push(curr.right);\n    }\n    i++;\n  }\n  return root;\n}\nfunction serializeTree(root) {\n  if (!root) return [];\n  const res = [];\n  const queue = [root];\n  while (queue.length) {\n    const node = queue.shift();\n    if (node) {\n      res.push(node.val);\n      queue.push(node.left);\n      queue.push(node.right);\n    } else {\n      res.push(null);\n    }\n  }\n  while (res.length > 0 && res[res.length - 1] === null) res.pop();\n  return res;\n}\n\nfunction isSame(p, q) {\n  if (!p && !q) return true;\n  if (!p || !q || p.val !== q.val) return false;\n  return isSame(p.left, q.left) && isSame(p.right, q.right);\n}\nfunction isSubtree(root, subRoot) {\n  if (!subRoot) return true;\n  if (!root) return false;\n  if (isSame(root, subRoot)) return true;\n  return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  const root = buildTree(JSON.parse(lines[0]));\n  const subRoot = buildTree(JSON.parse(lines[1]));\n  console.log(isSubtree(root, subRoot));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def isSubtree(self, root, subRoot) -> bool:\n        def is_same(p, q):\n            if not p and not q: return True\n            if not p or not q or p.val != q.val: return False\n            return is_same(p.left, q.left) and is_same(p.right, q.right)\n        if not subRoot: return True\n        if not root: return False\n        if is_same(root, subRoot): return True\n        return self.isSubtree(root.left, subRoot) or self.isSubtree(root.right, subRoot)",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_51: ProblemSeed = {
  "title": "Lowest Common Ancestor of a Binary Search Tree",
  "description": "Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes in the BST.\nAccording to the definition of LCA on Wikipedia: \"The lowest common ancestor is defined between two nodes p and q as the lowest node in T that has both p and q as descendants (where we allow a node to be a descendant of itself).\"",
  "difficulty": "MEDIUM",
  "tags": [
    "Trees",
    "Binary Search Tree",
    "DFS"
  ],
  "constraints": "The number of nodes in the tree is in the range [2, 10^5].\n-10^9 <= Node.val <= 10^9\nAll Node.val are unique.\np != q\np and q will exist in the BST.",
  "hints": "In a BST, if both p and q are smaller than root, go left. If both are greater, go right. Otherwise, root is the LCA.",
  "editorial": "Approach: Walk down BST. If p.val < curr.val && q.val < curr.val move to curr.left. If both greater move to curr.right. Else curr is LCA.\nTime Complexity: O(h)\nSpace Complexity: O(1)",
  "testCases": [
    {
      "input": "[6,2,8,0,4,7,9,null,null,3,5]\n2\n8",
      "output": "6"
    },
    {
      "input": "[6,2,8,0,4,7,9,null,null,3,5]\n2\n4",
      "output": "2"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8",
      "output": "6",
      "explanation": "The LCA of nodes 2 and 8 is 6."
    },
    "PYTHON": {
      "input": "root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8",
      "output": "6",
      "explanation": "The LCA of nodes 2 and 8 is 6."
    },
    "JAVA": {
      "input": "root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8",
      "output": "6",
      "explanation": "The LCA of nodes 2 and 8 is 6."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "\nfunction buildTree(arr) {\n  if (!arr || arr.length === 0 || arr[0] === null) return null;\n  function TreeNode(val) { this.val = val; this.left = this.right = null; }\n  const root = new TreeNode(arr[0]);\n  const queue = [root];\n  let i = 1;\n  while (queue.length > 0 && i < arr.length) {\n    const curr = queue.shift();\n    if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {\n      curr.left = new TreeNode(arr[i]);\n      queue.push(curr.left);\n    }\n    i++;\n    if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {\n      curr.right = new TreeNode(arr[i]);\n      queue.push(curr.right);\n    }\n    i++;\n  }\n  return root;\n}\nfunction serializeTree(root) {\n  if (!root) return [];\n  const res = [];\n  const queue = [root];\n  while (queue.length) {\n    const node = queue.shift();\n    if (node) {\n      res.push(node.val);\n      queue.push(node.left);\n      queue.push(node.right);\n    } else {\n      res.push(null);\n    }\n  }\n  while (res.length > 0 && res[res.length - 1] === null) res.pop();\n  return res;\n}\n\nfunction lowestCommonAncestor(root, pVal, qVal) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  const root = buildTree(JSON.parse(lines[0]));\n  const pVal = parseInt(lines[1], 10);\n  const qVal = parseInt(lines[2], 10);\n  const ans = lowestCommonAncestor(root, pVal, qVal);\n  console.log(ans ? ans.val : null);\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def lowestCommonAncestor(self, root, p: int, q: int):\n        pass",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "\nfunction buildTree(arr) {\n  if (!arr || arr.length === 0 || arr[0] === null) return null;\n  function TreeNode(val) { this.val = val; this.left = this.right = null; }\n  const root = new TreeNode(arr[0]);\n  const queue = [root];\n  let i = 1;\n  while (queue.length > 0 && i < arr.length) {\n    const curr = queue.shift();\n    if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {\n      curr.left = new TreeNode(arr[i]);\n      queue.push(curr.left);\n    }\n    i++;\n    if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {\n      curr.right = new TreeNode(arr[i]);\n      queue.push(curr.right);\n    }\n    i++;\n  }\n  return root;\n}\nfunction serializeTree(root) {\n  if (!root) return [];\n  const res = [];\n  const queue = [root];\n  while (queue.length) {\n    const node = queue.shift();\n    if (node) {\n      res.push(node.val);\n      queue.push(node.left);\n      queue.push(node.right);\n    } else {\n      res.push(null);\n    }\n  }\n  while (res.length > 0 && res[res.length - 1] === null) res.pop();\n  return res;\n}\n\nfunction lowestCommonAncestor(root, pVal, qVal) {\n  let curr = root;\n  while (curr) {\n    if (pVal < curr.val && qVal < curr.val) curr = curr.left;\n    else if (pVal > curr.val && qVal > curr.val) curr = curr.right;\n    else return curr;\n  }\n  return null;\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  const root = buildTree(JSON.parse(lines[0]));\n  const pVal = parseInt(lines[1], 10);\n  const qVal = parseInt(lines[2], 10);\n  const ans = lowestCommonAncestor(root, pVal, qVal);\n  console.log(ans ? ans.val : null);\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def lowestCommonAncestor(self, root, p: int, q: int):\n        curr = root\n        while curr:\n            if p < curr.val and q < curr.val:\n                curr = curr.left\n            elif p > curr.val and q > curr.val:\n                curr = curr.right\n            else:\n                return curr.val",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_52: ProblemSeed = {
  "title": "Binary Tree Level Order Traversal",
  "description": "Given the root of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).",
  "difficulty": "MEDIUM",
  "tags": [
    "Trees",
    "Binary Tree",
    "BFS"
  ],
  "constraints": "The number of nodes in the tree is in the range [0, 2000].\n-1000 <= Node.val <= 1000",
  "hints": "Use a queue and iterate level by level using the queue's length.",
  "editorial": "Approach: BFS queue. At each level, take queue.length items, push values to current level array, and push their children to queue.\nTime Complexity: O(n)\nSpace Complexity: O(n)",
  "testCases": [
    {
      "input": "[3,9,20,null,null,15,7]",
      "output": "[[3],[9,20],[15,7]]"
    },
    {
      "input": "[1]",
      "output": "[[1]]"
    },
    {
      "input": "[]",
      "output": "[]"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "root = [3,9,20,null,null,15,7]",
      "output": "[[3],[9,20],[15,7]]",
      "explanation": "Traversed level by level."
    },
    "PYTHON": {
      "input": "root = [3,9,20,null,null,15,7]",
      "output": "[[3],[9,20],[15,7]]",
      "explanation": "Traversed level by level."
    },
    "JAVA": {
      "input": "root = [3,9,20,null,null,15,7]",
      "output": "[[3],[9,20],[15,7]]",
      "explanation": "Traversed level by level."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "\nfunction buildTree(arr) {\n  if (!arr || arr.length === 0 || arr[0] === null) return null;\n  function TreeNode(val) { this.val = val; this.left = this.right = null; }\n  const root = new TreeNode(arr[0]);\n  const queue = [root];\n  let i = 1;\n  while (queue.length > 0 && i < arr.length) {\n    const curr = queue.shift();\n    if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {\n      curr.left = new TreeNode(arr[i]);\n      queue.push(curr.left);\n    }\n    i++;\n    if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {\n      curr.right = new TreeNode(arr[i]);\n      queue.push(curr.right);\n    }\n    i++;\n  }\n  return root;\n}\nfunction serializeTree(root) {\n  if (!root) return [];\n  const res = [];\n  const queue = [root];\n  while (queue.length) {\n    const node = queue.shift();\n    if (node) {\n      res.push(node.val);\n      queue.push(node.left);\n      queue.push(node.right);\n    } else {\n      res.push(null);\n    }\n  }\n  while (res.length > 0 && res[res.length - 1] === null) res.pop();\n  return res;\n}\n\nfunction levelOrder(root) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  const root = buildTree(JSON.parse(lines[0] || '[]'));\n  console.log(JSON.stringify(levelOrder(root)));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def levelOrder(self, root) -> list[list[int]]:\n        pass",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "\nfunction buildTree(arr) {\n  if (!arr || arr.length === 0 || arr[0] === null) return null;\n  function TreeNode(val) { this.val = val; this.left = this.right = null; }\n  const root = new TreeNode(arr[0]);\n  const queue = [root];\n  let i = 1;\n  while (queue.length > 0 && i < arr.length) {\n    const curr = queue.shift();\n    if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {\n      curr.left = new TreeNode(arr[i]);\n      queue.push(curr.left);\n    }\n    i++;\n    if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {\n      curr.right = new TreeNode(arr[i]);\n      queue.push(curr.right);\n    }\n    i++;\n  }\n  return root;\n}\nfunction serializeTree(root) {\n  if (!root) return [];\n  const res = [];\n  const queue = [root];\n  while (queue.length) {\n    const node = queue.shift();\n    if (node) {\n      res.push(node.val);\n      queue.push(node.left);\n      queue.push(node.right);\n    } else {\n      res.push(null);\n    }\n  }\n  while (res.length > 0 && res[res.length - 1] === null) res.pop();\n  return res;\n}\n\nfunction levelOrder(root) {\n  if (!root) return [];\n  const res = [];\n  const queue = [root];\n  while (queue.length) {\n    const len = queue.length;\n    const level = [];\n    for (let i = 0; i < len; i++) {\n      const node = queue.shift();\n      level.push(node.val);\n      if (node.left) queue.push(node.left);\n      if (node.right) queue.push(node.right);\n    }\n    res.push(level);\n  }\n  return res;\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  const root = buildTree(JSON.parse(lines[0] || '[]'));\n  console.log(JSON.stringify(levelOrder(root)));\n});",
    "PYTHON": "import sys, json\nfrom collections import deque\nclass Solution:\n    def levelOrder(self, root) -> list[list[int]]:\n        if not root: return []\n        q = deque([root])\n        res = []\n        while q:\n            lvl = []\n            for _ in range(len(q)):\n                node = q.popleft()\n                lvl.append(node.val)\n                if node.left: q.append(node.left)\n                if node.right: q.append(node.right)\n            res.append(lvl)\n        return res",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_53: ProblemSeed = {
  "title": "Binary Tree Right Side View",
  "description": "Given the root of a binary tree, imagine yourself standing on the right side of it, return the values of the nodes you can see ordered from top to bottom.",
  "difficulty": "MEDIUM",
  "tags": [
    "Trees",
    "Binary Tree",
    "DFS",
    "BFS"
  ],
  "constraints": "The number of nodes in the tree is in the range [0, 100].\n-100 <= Node.val <= 100",
  "hints": "Level-order traversal: collect the last node of each level.",
  "editorial": "Approach: BFS level by level, add the value of the last node of each level to result.\nTime Complexity: O(n)\nSpace Complexity: O(n)",
  "testCases": [
    {
      "input": "[1,2,3,null,5,null,4]",
      "output": "[1,3,4]"
    },
    {
      "input": "[1,null,3]",
      "output": "[1,3]"
    },
    {
      "input": "[]",
      "output": "[]"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "root = [1,2,3,null,5,null,4]",
      "output": "[1,3,4]",
      "explanation": "Looking from right side gives [1,3,4]."
    },
    "PYTHON": {
      "input": "root = [1,2,3,null,5,null,4]",
      "output": "[1,3,4]",
      "explanation": "Looking from right side gives [1,3,4]."
    },
    "JAVA": {
      "input": "root = [1,2,3,null,5,null,4]",
      "output": "[1,3,4]",
      "explanation": "Looking from right side gives [1,3,4]."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "\nfunction buildTree(arr) {\n  if (!arr || arr.length === 0 || arr[0] === null) return null;\n  function TreeNode(val) { this.val = val; this.left = this.right = null; }\n  const root = new TreeNode(arr[0]);\n  const queue = [root];\n  let i = 1;\n  while (queue.length > 0 && i < arr.length) {\n    const curr = queue.shift();\n    if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {\n      curr.left = new TreeNode(arr[i]);\n      queue.push(curr.left);\n    }\n    i++;\n    if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {\n      curr.right = new TreeNode(arr[i]);\n      queue.push(curr.right);\n    }\n    i++;\n  }\n  return root;\n}\nfunction serializeTree(root) {\n  if (!root) return [];\n  const res = [];\n  const queue = [root];\n  while (queue.length) {\n    const node = queue.shift();\n    if (node) {\n      res.push(node.val);\n      queue.push(node.left);\n      queue.push(node.right);\n    } else {\n      res.push(null);\n    }\n  }\n  while (res.length > 0 && res[res.length - 1] === null) res.pop();\n  return res;\n}\n\nfunction rightSideView(root) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  const root = buildTree(JSON.parse(lines[0] || '[]'));\n  console.log(JSON.stringify(rightSideView(root)));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def rightSideView(self, root) -> list[int]:\n        pass",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "\nfunction buildTree(arr) {\n  if (!arr || arr.length === 0 || arr[0] === null) return null;\n  function TreeNode(val) { this.val = val; this.left = this.right = null; }\n  const root = new TreeNode(arr[0]);\n  const queue = [root];\n  let i = 1;\n  while (queue.length > 0 && i < arr.length) {\n    const curr = queue.shift();\n    if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {\n      curr.left = new TreeNode(arr[i]);\n      queue.push(curr.left);\n    }\n    i++;\n    if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {\n      curr.right = new TreeNode(arr[i]);\n      queue.push(curr.right);\n    }\n    i++;\n  }\n  return root;\n}\nfunction serializeTree(root) {\n  if (!root) return [];\n  const res = [];\n  const queue = [root];\n  while (queue.length) {\n    const node = queue.shift();\n    if (node) {\n      res.push(node.val);\n      queue.push(node.left);\n      queue.push(node.right);\n    } else {\n      res.push(null);\n    }\n  }\n  while (res.length > 0 && res[res.length - 1] === null) res.pop();\n  return res;\n}\n\nfunction rightSideView(root) {\n  if (!root) return [];\n  const res = [];\n  const queue = [root];\n  while (queue.length) {\n    const len = queue.length;\n    for (let i = 0; i < len; i++) {\n      const node = queue.shift();\n      if (i === len - 1) res.push(node.val);\n      if (node.left) queue.push(node.left);\n      if (node.right) queue.push(node.right);\n    }\n  }\n  return res;\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  const root = buildTree(JSON.parse(lines[0] || '[]'));\n  console.log(JSON.stringify(rightSideView(root)));\n});",
    "PYTHON": "import sys, json\nfrom collections import deque\nclass Solution:\n    def rightSideView(self, root) -> list[int]:\n        if not root: return []\n        q = deque([root])\n        res = []\n        while q:\n            length = len(q)\n            for i in range(length):\n                node = q.popleft()\n                if i == length - 1:\n                    res.append(node.val)\n                if node.left: q.append(node.left)\n                if node.right: q.append(node.right)\n        return res",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_54: ProblemSeed = {
  "title": "Count Good Nodes in Binary Tree",
  "description": "Given a binary tree root, a node X in the tree is named good if in the path from the root to X there are no nodes with a value greater than X.\nReturn the number of good nodes in the binary tree.",
  "difficulty": "MEDIUM",
  "tags": [
    "Trees",
    "Binary Tree",
    "DFS",
    "BFS"
  ],
  "constraints": "The number of nodes in the binary tree is in the range [1, 10^5].\nEach node's value is between [-10^4, 10^4].",
  "hints": "Pass down the maximum value seen so far on the path from the root.",
  "editorial": "Approach: DFS carrying maxVal. If node.val >= maxVal, good nodes count increments by 1, and new maxVal = max(maxVal, node.val).\nTime Complexity: O(n)\nSpace Complexity: O(h)",
  "testCases": [
    {
      "input": "[3,1,4,3,null,1,5]",
      "output": "4"
    },
    {
      "input": "[3,3,null,4,2]",
      "output": "3"
    },
    {
      "input": "[1]",
      "output": "1"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "root = [3,1,4,3,null,1,5]",
      "output": "4",
      "explanation": "Root Node (3), Node 4, Node 5, Node 3 are good."
    },
    "PYTHON": {
      "input": "root = [3,1,4,3,null,1,5]",
      "output": "4",
      "explanation": "Root Node (3), Node 4, Node 5, Node 3 are good."
    },
    "JAVA": {
      "input": "root = [3,1,4,3,null,1,5]",
      "output": "4",
      "explanation": "Root Node (3), Node 4, Node 5, Node 3 are good."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "\nfunction buildTree(arr) {\n  if (!arr || arr.length === 0 || arr[0] === null) return null;\n  function TreeNode(val) { this.val = val; this.left = this.right = null; }\n  const root = new TreeNode(arr[0]);\n  const queue = [root];\n  let i = 1;\n  while (queue.length > 0 && i < arr.length) {\n    const curr = queue.shift();\n    if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {\n      curr.left = new TreeNode(arr[i]);\n      queue.push(curr.left);\n    }\n    i++;\n    if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {\n      curr.right = new TreeNode(arr[i]);\n      queue.push(curr.right);\n    }\n    i++;\n  }\n  return root;\n}\nfunction serializeTree(root) {\n  if (!root) return [];\n  const res = [];\n  const queue = [root];\n  while (queue.length) {\n    const node = queue.shift();\n    if (node) {\n      res.push(node.val);\n      queue.push(node.left);\n      queue.push(node.right);\n    } else {\n      res.push(null);\n    }\n  }\n  while (res.length > 0 && res[res.length - 1] === null) res.pop();\n  return res;\n}\n\nfunction goodNodes(root) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  const root = buildTree(JSON.parse(lines[0]));\n  console.log(goodNodes(root));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def goodNodes(self, root) -> int:\n        pass",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "\nfunction buildTree(arr) {\n  if (!arr || arr.length === 0 || arr[0] === null) return null;\n  function TreeNode(val) { this.val = val; this.left = this.right = null; }\n  const root = new TreeNode(arr[0]);\n  const queue = [root];\n  let i = 1;\n  while (queue.length > 0 && i < arr.length) {\n    const curr = queue.shift();\n    if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {\n      curr.left = new TreeNode(arr[i]);\n      queue.push(curr.left);\n    }\n    i++;\n    if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {\n      curr.right = new TreeNode(arr[i]);\n      queue.push(curr.right);\n    }\n    i++;\n  }\n  return root;\n}\nfunction serializeTree(root) {\n  if (!root) return [];\n  const res = [];\n  const queue = [root];\n  while (queue.length) {\n    const node = queue.shift();\n    if (node) {\n      res.push(node.val);\n      queue.push(node.left);\n      queue.push(node.right);\n    } else {\n      res.push(null);\n    }\n  }\n  while (res.length > 0 && res[res.length - 1] === null) res.pop();\n  return res;\n}\n\nfunction goodNodes(root) {\n  function dfs(node, maxVal) {\n    if (!node) return 0;\n    let count = node.val >= maxVal ? 1 : 0;\n    const newMax = Math.max(maxVal, node.val);\n    count += dfs(node.left, newMax);\n    count += dfs(node.right, newMax);\n    return count;\n  }\n  return dfs(root, root.val);\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  const root = buildTree(JSON.parse(lines[0]));\n  console.log(goodNodes(root));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def goodNodes(self, root) -> int:\n        def dfs(node, max_val):\n            if not node: return 0\n            cnt = 1 if node.val >= max_val else 0\n            new_max = max(max_val, node.val)\n            return cnt + dfs(node.left, new_max) + dfs(node.right, new_max)\n        return dfs(root, root.val)",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_55: ProblemSeed = {
  "title": "Validate Binary Search Tree",
  "description": "Given the root of a binary tree, determine if it is a valid binary search tree (BST).\nA valid BST is defined as follows:\n- The left subtree of a node contains only nodes with keys less than the node's key.\n- The right subtree of a node contains only nodes with keys greater than the node's key.\n- Both the left and right subtrees must also be binary search trees.",
  "difficulty": "MEDIUM",
  "tags": [
    "Trees",
    "Binary Search Tree",
    "DFS"
  ],
  "constraints": "The number of nodes in the tree is in the range [1, 10^4].\n-2^31 <= Node.val <= 2^31 - 1",
  "hints": "Pass valid range [min, max] down the recursion tree.",
  "editorial": "Approach: Validate each node against lower and upper bounds (-Infinity to Infinity). Left child bound: (min, node.val), right child bound: (node.val, max).\nTime Complexity: O(n)\nSpace Complexity: O(h)",
  "testCases": [
    {
      "input": "[2,1,3]",
      "output": "true"
    },
    {
      "input": "[5,1,4,null,null,3,6]",
      "output": "false"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "root = [2,1,3]",
      "output": "true",
      "explanation": "Valid BST."
    },
    "PYTHON": {
      "input": "root = [2,1,3]",
      "output": "true",
      "explanation": "Valid BST."
    },
    "JAVA": {
      "input": "root = [2,1,3]",
      "output": "true",
      "explanation": "Valid BST."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "\nfunction buildTree(arr) {\n  if (!arr || arr.length === 0 || arr[0] === null) return null;\n  function TreeNode(val) { this.val = val; this.left = this.right = null; }\n  const root = new TreeNode(arr[0]);\n  const queue = [root];\n  let i = 1;\n  while (queue.length > 0 && i < arr.length) {\n    const curr = queue.shift();\n    if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {\n      curr.left = new TreeNode(arr[i]);\n      queue.push(curr.left);\n    }\n    i++;\n    if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {\n      curr.right = new TreeNode(arr[i]);\n      queue.push(curr.right);\n    }\n    i++;\n  }\n  return root;\n}\nfunction serializeTree(root) {\n  if (!root) return [];\n  const res = [];\n  const queue = [root];\n  while (queue.length) {\n    const node = queue.shift();\n    if (node) {\n      res.push(node.val);\n      queue.push(node.left);\n      queue.push(node.right);\n    } else {\n      res.push(null);\n    }\n  }\n  while (res.length > 0 && res[res.length - 1] === null) res.pop();\n  return res;\n}\n\nfunction isValidBST(root) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  const root = buildTree(JSON.parse(lines[0]));\n  console.log(isValidBST(root));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def isValidBST(self, root) -> bool:\n        pass",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "\nfunction buildTree(arr) {\n  if (!arr || arr.length === 0 || arr[0] === null) return null;\n  function TreeNode(val) { this.val = val; this.left = this.right = null; }\n  const root = new TreeNode(arr[0]);\n  const queue = [root];\n  let i = 1;\n  while (queue.length > 0 && i < arr.length) {\n    const curr = queue.shift();\n    if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {\n      curr.left = new TreeNode(arr[i]);\n      queue.push(curr.left);\n    }\n    i++;\n    if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {\n      curr.right = new TreeNode(arr[i]);\n      queue.push(curr.right);\n    }\n    i++;\n  }\n  return root;\n}\nfunction serializeTree(root) {\n  if (!root) return [];\n  const res = [];\n  const queue = [root];\n  while (queue.length) {\n    const node = queue.shift();\n    if (node) {\n      res.push(node.val);\n      queue.push(node.left);\n      queue.push(node.right);\n    } else {\n      res.push(null);\n    }\n  }\n  while (res.length > 0 && res[res.length - 1] === null) res.pop();\n  return res;\n}\n\nfunction isValidBST(root) {\n  function dfs(node, min, max) {\n    if (!node) return true;\n    if (node.val <= min || node.val >= max) return false;\n    return dfs(node.left, min, node.val) && dfs(node.right, node.val, max);\n  }\n  return dfs(root, -Infinity, Infinity);\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  const root = buildTree(JSON.parse(lines[0]));\n  console.log(isValidBST(root));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def isValidBST(self, root) -> bool:\n        def dfs(node, min_v, max_v):\n            if not node: return True\n            if not (min_v < node.val < max_v): return False\n            return dfs(node.left, min_v, node.val) and dfs(node.right, node.val, max_v)\n        return dfs(root, float('-inf'), float('inf'))",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_56: ProblemSeed = {
  "title": "Kth Smallest Element in a BST",
  "description": "Given the root of a binary search tree, and an integer k, return the kth smallest value (1-indexed) of all the values of the nodes in the tree.",
  "difficulty": "MEDIUM",
  "tags": [
    "Trees",
    "Binary Search Tree",
    "DFS"
  ],
  "constraints": "The number of nodes in the tree is n.\n1 <= k <= n <= 10^4\n0 <= Node.val <= 10^4",
  "hints": "In-order traversal visits BST nodes in strictly ascending order.",
  "editorial": "Approach: In-order traversal visits nodes in ascending order. Decrement k when visiting a node; when k reaches 0, that node is the kth smallest.\nTime Complexity: O(h + k)\nSpace Complexity: O(h)",
  "testCases": [
    {
      "input": "[3,1,4,null,2]\n1",
      "output": "1"
    },
    {
      "input": "[5,3,6,2,4,null,null,1]\n3",
      "output": "3"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "root = [3,1,4,null,2], k = 1",
      "output": "1",
      "explanation": "Smallest element is 1."
    },
    "PYTHON": {
      "input": "root = [3,1,4,null,2], k = 1",
      "output": "1",
      "explanation": "Smallest element is 1."
    },
    "JAVA": {
      "input": "root = [3,1,4,null,2], k = 1",
      "output": "1",
      "explanation": "Smallest element is 1."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "\nfunction buildTree(arr) {\n  if (!arr || arr.length === 0 || arr[0] === null) return null;\n  function TreeNode(val) { this.val = val; this.left = this.right = null; }\n  const root = new TreeNode(arr[0]);\n  const queue = [root];\n  let i = 1;\n  while (queue.length > 0 && i < arr.length) {\n    const curr = queue.shift();\n    if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {\n      curr.left = new TreeNode(arr[i]);\n      queue.push(curr.left);\n    }\n    i++;\n    if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {\n      curr.right = new TreeNode(arr[i]);\n      queue.push(curr.right);\n    }\n    i++;\n  }\n  return root;\n}\nfunction serializeTree(root) {\n  if (!root) return [];\n  const res = [];\n  const queue = [root];\n  while (queue.length) {\n    const node = queue.shift();\n    if (node) {\n      res.push(node.val);\n      queue.push(node.left);\n      queue.push(node.right);\n    } else {\n      res.push(null);\n    }\n  }\n  while (res.length > 0 && res[res.length - 1] === null) res.pop();\n  return res;\n}\n\nfunction kthSmallest(root, k) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  const root = buildTree(JSON.parse(lines[0]));\n  const k = parseInt(lines[1], 10);\n  console.log(kthSmallest(root, k));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def kthSmallest(self, root, k: int) -> int:\n        pass",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "\nfunction buildTree(arr) {\n  if (!arr || arr.length === 0 || arr[0] === null) return null;\n  function TreeNode(val) { this.val = val; this.left = this.right = null; }\n  const root = new TreeNode(arr[0]);\n  const queue = [root];\n  let i = 1;\n  while (queue.length > 0 && i < arr.length) {\n    const curr = queue.shift();\n    if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {\n      curr.left = new TreeNode(arr[i]);\n      queue.push(curr.left);\n    }\n    i++;\n    if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {\n      curr.right = new TreeNode(arr[i]);\n      queue.push(curr.right);\n    }\n    i++;\n  }\n  return root;\n}\nfunction serializeTree(root) {\n  if (!root) return [];\n  const res = [];\n  const queue = [root];\n  while (queue.length) {\n    const node = queue.shift();\n    if (node) {\n      res.push(node.val);\n      queue.push(node.left);\n      queue.push(node.right);\n    } else {\n      res.push(null);\n    }\n  }\n  while (res.length > 0 && res[res.length - 1] === null) res.pop();\n  return res;\n}\n\nfunction kthSmallest(root, k) {\n  let res = null;\n  let count = 0;\n  function inorder(node) {\n    if (!node || res !== null) return;\n    inorder(node.left);\n    count++;\n    if (count === k) { res = node.val; return; }\n    inorder(node.right);\n  }\n  inorder(root);\n  return res;\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  const root = buildTree(JSON.parse(lines[0]));\n  const k = parseInt(lines[1], 10);\n  console.log(kthSmallest(root, k));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def kthSmallest(self, root, k: int) -> int:\n        res = None\n        cnt = 0\n        def inorder(node):\n            nonlocal res, cnt\n            if not node or res is not None: return\n            inorder(node.left)\n            cnt += 1\n            if cnt == k: res = node.val; return\n            inorder(node.right)\n        inorder(root)\n        return res",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_57: ProblemSeed = {
  "title": "Construct Binary Tree from Preorder and Inorder Traversal",
  "description": "Given two integer arrays preorder and inorder where preorder is the preorder traversal of a binary tree and inorder is the inorder traversal of the same tree, construct and return the binary tree.",
  "difficulty": "MEDIUM",
  "tags": [
    "Trees",
    "Binary Tree",
    "Divide and Conquer",
    "Array"
  ],
  "constraints": "1 <= preorder.length <= 3000\ninorder.length == preorder.length\n-3000 <= preorder[i], inorder[i] <= 3000\npreorder and inorder consist of unique values.\nEach value of inorder also appears in preorder.",
  "hints": "The first element of preorder is the root. Find its index in inorder to divide left and right subtrees.",
  "editorial": "Approach: preorder[0] is root. Find root in inorder array at index idx. Left subtree has preorder[1..idx] and inorder[0..idx-1]. Recursively build left and right.\nTime Complexity: O(n)\nSpace Complexity: O(n)",
  "testCases": [
    {
      "input": "[3,9,20,15,7]\n[9,3,15,20,7]",
      "output": "[3,9,20,null,null,15,7]"
    },
    {
      "input": "[-1]\n[-1]",
      "output": "[-1]"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]",
      "output": "[3,9,20,null,null,15,7]",
      "explanation": "Constructs the original tree."
    },
    "PYTHON": {
      "input": "preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]",
      "output": "[3,9,20,null,null,15,7]",
      "explanation": "Constructs the original tree."
    },
    "JAVA": {
      "input": "preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]",
      "output": "[3,9,20,null,null,15,7]",
      "explanation": "Constructs the original tree."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "\nfunction buildTree(arr) {\n  if (!arr || arr.length === 0 || arr[0] === null) return null;\n  function TreeNode(val) { this.val = val; this.left = this.right = null; }\n  const root = new TreeNode(arr[0]);\n  const queue = [root];\n  let i = 1;\n  while (queue.length > 0 && i < arr.length) {\n    const curr = queue.shift();\n    if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {\n      curr.left = new TreeNode(arr[i]);\n      queue.push(curr.left);\n    }\n    i++;\n    if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {\n      curr.right = new TreeNode(arr[i]);\n      queue.push(curr.right);\n    }\n    i++;\n  }\n  return root;\n}\nfunction serializeTree(root) {\n  if (!root) return [];\n  const res = [];\n  const queue = [root];\n  while (queue.length) {\n    const node = queue.shift();\n    if (node) {\n      res.push(node.val);\n      queue.push(node.left);\n      queue.push(node.right);\n    } else {\n      res.push(null);\n    }\n  }\n  while (res.length > 0 && res[res.length - 1] === null) res.pop();\n  return res;\n}\n\nfunction buildTreeFromOrders(preorder, inorder) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  const preorder = JSON.parse(lines[0]);\n  const inorder = JSON.parse(lines[1]);\n  const root = buildTreeFromOrders(preorder, inorder);\n  console.log(JSON.stringify(serializeTree(root)));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def buildTree(self, preorder: list[int], inorder: list[int]):\n        pass",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "\nfunction buildTree(arr) {\n  if (!arr || arr.length === 0 || arr[0] === null) return null;\n  function TreeNode(val) { this.val = val; this.left = this.right = null; }\n  const root = new TreeNode(arr[0]);\n  const queue = [root];\n  let i = 1;\n  while (queue.length > 0 && i < arr.length) {\n    const curr = queue.shift();\n    if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {\n      curr.left = new TreeNode(arr[i]);\n      queue.push(curr.left);\n    }\n    i++;\n    if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {\n      curr.right = new TreeNode(arr[i]);\n      queue.push(curr.right);\n    }\n    i++;\n  }\n  return root;\n}\nfunction serializeTree(root) {\n  if (!root) return [];\n  const res = [];\n  const queue = [root];\n  while (queue.length) {\n    const node = queue.shift();\n    if (node) {\n      res.push(node.val);\n      queue.push(node.left);\n      queue.push(node.right);\n    } else {\n      res.push(null);\n    }\n  }\n  while (res.length > 0 && res[res.length - 1] === null) res.pop();\n  return res;\n}\n\nfunction buildTreeFromOrders(preorder, inorder) {\n  const map = new Map();\n  inorder.forEach((val, idx) => map.set(val, idx));\n  let preIdx = 0;\n  function TreeNode(val) { this.val = val; this.left = this.right = null; }\n  function build(left, right) {\n    if (left > right) return null;\n    const rootVal = preorder[preIdx++];\n    const root = new TreeNode(rootVal);\n    const mid = map.get(rootVal);\n    root.left = build(left, mid - 1);\n    root.right = build(mid + 1, right);\n    return root;\n  }\n  return build(0, inorder.length - 1);\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  const preorder = JSON.parse(lines[0]);\n  const inorder = JSON.parse(lines[1]);\n  const root = buildTreeFromOrders(preorder, inorder);\n  console.log(JSON.stringify(serializeTree(root)));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def buildTree(self, preorder: list[int], inorder: list[int]):\n        in_map = {val: i for i, val in enumerate(inorder)}\n        pre_idx = 0\n        def build(l, r):\n            nonlocal pre_idx\n            if l > r: return None\n            val = preorder[pre_idx]\n            pre_idx += 1\n            node = TreeNode(val)\n            mid = in_map[val]\n            node.left = build(l, mid - 1)\n            node.right = build(mid + 1, r)\n            return node\n        return build(0, len(inorder) - 1)",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_58: ProblemSeed = {
  "title": "Binary Tree Maximum Path Sum",
  "description": "A path in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them. A node can only appear in the sequence at most once. Note that the path does not need to pass through the root.\nThe path sum of a path is the sum of the node's values in the path.\nGiven the root of a binary tree, return the maximum path sum of any non-empty path.",
  "difficulty": "HARD",
  "tags": [
    "Trees",
    "Binary Tree",
    "DFS",
    "Dynamic Programming"
  ],
  "constraints": "The number of nodes in the tree is in the range [1, 3 * 10^4].\n-1000 <= Node.val <= 1000",
  "hints": "At each node, the max path passing through it can combine node.val + max(0, left) + max(0, right).",
  "editorial": "Approach: Post-order DFS. For each node, compute max gain from left and right child (clamped to 0). Update global max with node.val + leftGain + rightGain. Return node.val + max(leftGain, rightGain).\nTime Complexity: O(n)\nSpace Complexity: O(h)",
  "testCases": [
    {
      "input": "[1,2,3]",
      "output": "6"
    },
    {
      "input": "[-10,9,20,null,null,15,7]",
      "output": "42"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "root = [1,2,3]",
      "output": "6",
      "explanation": "Path 2 -> 1 -> 3 gives 2 + 1 + 3 = 6."
    },
    "PYTHON": {
      "input": "root = [1,2,3]",
      "output": "6",
      "explanation": "Path 2 -> 1 -> 3 gives 2 + 1 + 3 = 6."
    },
    "JAVA": {
      "input": "root = [1,2,3]",
      "output": "6",
      "explanation": "Path 2 -> 1 -> 3 gives 2 + 1 + 3 = 6."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "\nfunction buildTree(arr) {\n  if (!arr || arr.length === 0 || arr[0] === null) return null;\n  function TreeNode(val) { this.val = val; this.left = this.right = null; }\n  const root = new TreeNode(arr[0]);\n  const queue = [root];\n  let i = 1;\n  while (queue.length > 0 && i < arr.length) {\n    const curr = queue.shift();\n    if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {\n      curr.left = new TreeNode(arr[i]);\n      queue.push(curr.left);\n    }\n    i++;\n    if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {\n      curr.right = new TreeNode(arr[i]);\n      queue.push(curr.right);\n    }\n    i++;\n  }\n  return root;\n}\nfunction serializeTree(root) {\n  if (!root) return [];\n  const res = [];\n  const queue = [root];\n  while (queue.length) {\n    const node = queue.shift();\n    if (node) {\n      res.push(node.val);\n      queue.push(node.left);\n      queue.push(node.right);\n    } else {\n      res.push(null);\n    }\n  }\n  while (res.length > 0 && res[res.length - 1] === null) res.pop();\n  return res;\n}\n\nfunction maxPathSum(root) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  const root = buildTree(JSON.parse(lines[0]));\n  console.log(maxPathSum(root));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def maxPathSum(self, root) -> int:\n        pass",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "\nfunction buildTree(arr) {\n  if (!arr || arr.length === 0 || arr[0] === null) return null;\n  function TreeNode(val) { this.val = val; this.left = this.right = null; }\n  const root = new TreeNode(arr[0]);\n  const queue = [root];\n  let i = 1;\n  while (queue.length > 0 && i < arr.length) {\n    const curr = queue.shift();\n    if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {\n      curr.left = new TreeNode(arr[i]);\n      queue.push(curr.left);\n    }\n    i++;\n    if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {\n      curr.right = new TreeNode(arr[i]);\n      queue.push(curr.right);\n    }\n    i++;\n  }\n  return root;\n}\nfunction serializeTree(root) {\n  if (!root) return [];\n  const res = [];\n  const queue = [root];\n  while (queue.length) {\n    const node = queue.shift();\n    if (node) {\n      res.push(node.val);\n      queue.push(node.left);\n      queue.push(node.right);\n    } else {\n      res.push(null);\n    }\n  }\n  while (res.length > 0 && res[res.length - 1] === null) res.pop();\n  return res;\n}\n\nfunction maxPathSum(root) {\n  let maxSum = -Infinity;\n  function dfs(node) {\n    if (!node) return 0;\n    const left = Math.max(0, dfs(node.left));\n    const right = Math.max(0, dfs(node.right));\n    maxSum = Math.max(maxSum, node.val + left + right);\n    return node.val + Math.max(left, right);\n  }\n  dfs(root);\n  return maxSum;\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  const root = buildTree(JSON.parse(lines[0]));\n  console.log(maxPathSum(root));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def maxPathSum(self, root) -> int:\n        max_sum = float('-inf')\n        def dfs(node):\n            nonlocal max_sum\n            if not node: return 0\n            l = max(0, dfs(node.left))\n            r = max(0, dfs(node.right))\n            max_sum = max(max_sum, node.val + l + r)\n            return node.val + max(l, r)\n        dfs(root)\n        return max_sum",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_59: ProblemSeed = {
  "title": "Serialize and Deserialize Binary Tree",
  "description": "Serialization is the process of converting a data structure or object into a sequence of bits so that it can be stored in a file or memory buffer, or transmitted across a network connection link to be reconstructed later in the same or another computer environment.\nDesign an algorithm to serialize and deserialize a binary tree. There is no restriction on how your serialization/deserialization algorithm should work. You just need to ensure that a binary tree can be serialized to a string and this string can be deserialized to the original tree structure.",
  "difficulty": "HARD",
  "tags": [
    "Trees",
    "Binary Tree",
    "DFS",
    "BFS",
    "Design",
    "String"
  ],
  "constraints": "The number of nodes in the tree is in the range [0, 10^4].\n-1000 <= Node.val <= 1000",
  "hints": "Pre-order traversal with null markers is one standard approach.",
  "editorial": "Approach: Pre-order DFS recording 'null' for empty nodes and node values separated by commas. Deserialization consumes tokens from the pre-order string recursively.\nTime Complexity: O(n)\nSpace Complexity: O(n)",
  "testCases": [
    {
      "input": "[1,2,3,null,null,4,5]",
      "output": "[1,2,3,null,null,4,5]"
    },
    {
      "input": "[]",
      "output": "[]"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "root = [1,2,3,null,null,4,5]",
      "output": "[1,2,3,null,null,4,5]",
      "explanation": "Serializes and correctly deserializes to original tree."
    },
    "PYTHON": {
      "input": "root = [1,2,3,null,null,4,5]",
      "output": "[1,2,3,null,null,4,5]",
      "explanation": "Serializes and correctly deserializes to original tree."
    },
    "JAVA": {
      "input": "root = [1,2,3,null,null,4,5]",
      "output": "[1,2,3,null,null,4,5]",
      "explanation": "Serializes and correctly deserializes to original tree."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "\nfunction buildTree(arr) {\n  if (!arr || arr.length === 0 || arr[0] === null) return null;\n  function TreeNode(val) { this.val = val; this.left = this.right = null; }\n  const root = new TreeNode(arr[0]);\n  const queue = [root];\n  let i = 1;\n  while (queue.length > 0 && i < arr.length) {\n    const curr = queue.shift();\n    if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {\n      curr.left = new TreeNode(arr[i]);\n      queue.push(curr.left);\n    }\n    i++;\n    if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {\n      curr.right = new TreeNode(arr[i]);\n      queue.push(curr.right);\n    }\n    i++;\n  }\n  return root;\n}\nfunction serializeTree(root) {\n  if (!root) return [];\n  const res = [];\n  const queue = [root];\n  while (queue.length) {\n    const node = queue.shift();\n    if (node) {\n      res.push(node.val);\n      queue.push(node.left);\n      queue.push(node.right);\n    } else {\n      res.push(null);\n    }\n  }\n  while (res.length > 0 && res[res.length - 1] === null) res.pop();\n  return res;\n}\n\nfunction serialize(root) {\n  // Write your code here\n}\nfunction deserialize(data) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  const root = buildTree(JSON.parse(lines[0] || '[]'));\n  const s = serialize(root);\n  const deserialized = deserialize(s);\n  console.log(JSON.stringify(serializeTree(deserialized)));\n});",
    "PYTHON": "import sys, json\nclass Codec:\n    def serialize(self, root) -> str:\n        pass\n    def deserialize(self, data: str):\n        pass",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "\nfunction buildTree(arr) {\n  if (!arr || arr.length === 0 || arr[0] === null) return null;\n  function TreeNode(val) { this.val = val; this.left = this.right = null; }\n  const root = new TreeNode(arr[0]);\n  const queue = [root];\n  let i = 1;\n  while (queue.length > 0 && i < arr.length) {\n    const curr = queue.shift();\n    if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {\n      curr.left = new TreeNode(arr[i]);\n      queue.push(curr.left);\n    }\n    i++;\n    if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {\n      curr.right = new TreeNode(arr[i]);\n      queue.push(curr.right);\n    }\n    i++;\n  }\n  return root;\n}\nfunction serializeTree(root) {\n  if (!root) return [];\n  const res = [];\n  const queue = [root];\n  while (queue.length) {\n    const node = queue.shift();\n    if (node) {\n      res.push(node.val);\n      queue.push(node.left);\n      queue.push(node.right);\n    } else {\n      res.push(null);\n    }\n  }\n  while (res.length > 0 && res[res.length - 1] === null) res.pop();\n  return res;\n}\n\nfunction serialize(root) {\n  const res = [];\n  function dfs(node) {\n    if (!node) { res.push('N'); return; }\n    res.push(node.val.toString());\n    dfs(node.left);\n    dfs(node.right);\n  }\n  dfs(root);\n  return res.join(',');\n}\nfunction deserialize(data) {\n  const vals = data.split(',');\n  let i = 0;\n  function dfs() {\n    if (vals[i] === 'N') { i++; return null; }\n    function TreeNode(val) { this.val = val; this.left = this.right = null; }\n    const node = new TreeNode(parseInt(vals[i++], 10));\n    node.left = dfs();\n    node.right = dfs();\n    return node;\n  }\n  return dfs();\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  const root = buildTree(JSON.parse(lines[0] || '[]'));\n  const s = serialize(root);\n  const deserialized = deserialize(s);\n  console.log(JSON.stringify(serializeTree(deserialized)));\n});",
    "PYTHON": "import sys, json\nclass Codec:\n    def serialize(self, root) -> str:\n        res = []\n        def dfs(node):\n            if not node:\n                res.append('N')\n                return\n            res.append(str(node.val))\n            dfs(node.left)\n            dfs(node.right)\n        dfs(root)\n        return ','.join(res)\n    def deserialize(self, data: str):\n        vals = data.split(',')\n        self.i = 0\n        def dfs():\n            if vals[self.i] == 'N':\n                self.i += 1\n                return None\n            node = TreeNode(int(vals[self.i]))\n            self.i += 1\n            node.left = dfs()\n            node.right = dfs()\n            return node\n        return dfs()",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_60: ProblemSeed = {
  "title": "Implement Trie (Prefix Tree)",
  "description": "A trie (pronounced as \"try\") or prefix tree is a tree data structure used to efficiently store and retrieve keys in a dataset of strings. There are various applications of this data structure, such as autocomplete and spellchecker.\nImplement the Trie class:\n- Trie() Initializes the trie object.\n- void insert(String word) Inserts the string word into the trie.\n- boolean search(String word) Returns true if the string word is in the trie (i.e., was inserted before), and false otherwise.\n- boolean startsWith(String prefix) Returns true if there is a previously inserted string word that has the prefix prefix, and false otherwise.",
  "difficulty": "MEDIUM",
  "tags": [
    "Tries",
    "Design",
    "String",
    "Hash Table"
  ],
  "constraints": "1 <= word.length, prefix.length <= 2000\nword and prefix consist only of lowercase English letters.\nAt most 3 * 10^4 calls in total will be made to insert, search, and startsWith.",
  "hints": "Each node can have a map/array of size 26 for child nodes and an isEnd boolean flag.",
  "editorial": "Approach: Use node objects with a children dictionary and isEnd flag. Insert walks/creates nodes; search verifies all nodes exist and isEnd is true; startsWith verifies prefix exists.\nTime Complexity: O(L) per operation\nSpace Complexity: O(total length of inserted characters)",
  "testCases": [
    {
      "input": "[\"Trie\",\"insert\",\"search\",\"search\",\"startsWith\",\"insert\",\"search\"]\n[[],[\"apple\"],[\"apple\"],[\"app\"],[\"app\"],[\"app\"],[\"app\"]]",
      "output": "[null,null,true,false,true,null,true]"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "[\"Trie\",\"insert\",\"search\",\"search\",\"startsWith\",\"insert\",\"search\"]\n[[],[\"apple\"],[\"apple\"],[\"app\"],[\"app\"],[\"app\"],[\"app\"]]",
      "output": "[null,null,true,false,true,null,true]",
      "explanation": "Trie operations executed."
    },
    "PYTHON": {
      "input": "[\"Trie\",\"insert\",\"search\",\"search\",\"startsWith\",\"insert\",\"search\"]\n[[],[\"apple\"],[\"apple\"],[\"app\"],[\"app\"],[\"app\"],[\"app\"]]",
      "output": "[null,null,true,false,true,null,true]",
      "explanation": "Trie operations executed."
    },
    "JAVA": {
      "input": "[\"Trie\",\"insert\",\"search\",\"search\",\"startsWith\",\"insert\",\"search\"]\n[[],[\"apple\"],[\"apple\"],[\"app\"],[\"app\"],[\"app\"],[\"app\"]]",
      "output": "[null,null,true,false,true,null,true]",
      "explanation": "Trie operations executed."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "class Trie {\n  constructor() {\n    this.root = {};\n  }\n  insert(word) {\n    // Write your code here\n  }\n  search(word) {\n    // Write your code here\n  }\n  startsWith(prefix) {\n    // Write your code here\n  }\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  const ops = JSON.parse(lines[0]);\n  const args = JSON.parse(lines[1]);\n  let trie = null;\n  const res = [];\n  for (let i = 0; i < ops.length; i++) {\n    if (ops[i] === 'Trie') { trie = new Trie(); res.push(null); }\n    else if (ops[i] === 'insert') { trie.insert(args[i][0]); res.push(null); }\n    else if (ops[i] === 'search') { res.push(trie.search(args[i][0])); }\n    else if (ops[i] === 'startsWith') { res.push(trie.startsWith(args[i][0])); }\n  }\n  console.log(JSON.stringify(res));\n});",
    "PYTHON": "import sys, json\nclass Trie:\n    def __init__(self):\n        pass\n    def insert(self, word: str) -> None:\n        pass\n    def search(self, word: str) -> bool:\n        pass\n    def startsWith(self, prefix: str) -> bool:\n        pass",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "class Trie {\n  constructor() {\n    this.root = {};\n  }\n  insert(word) {\n    let node = this.root;\n    for (const ch of word) {\n      if (!node[ch]) node[ch] = {};\n      node = node[ch];\n    }\n    node.isEnd = true;\n  }\n  search(word) {\n    let node = this.root;\n    for (const ch of word) {\n      if (!node[ch]) return false;\n      node = node[ch];\n    }\n    return !!node.isEnd;\n  }\n  startsWith(prefix) {\n    let node = this.root;\n    for (const ch of prefix) {\n      if (!node[ch]) return false;\n      node = node[ch];\n    }\n    return true;\n  }\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  const ops = JSON.parse(lines[0]);\n  const args = JSON.parse(lines[1]);\n  let trie = null;\n  const res = [];\n  for (let i = 0; i < ops.length; i++) {\n    if (ops[i] === 'Trie') { trie = new Trie(); res.push(null); }\n    else if (ops[i] === 'insert') { trie.insert(args[i][0]); res.push(null); }\n    else if (ops[i] === 'search') { res.push(trie.search(args[i][0])); }\n    else if (ops[i] === 'startsWith') { res.push(trie.startsWith(args[i][0])); }\n  }\n  console.log(JSON.stringify(res));\n});",
    "PYTHON": "import sys, json\nclass Trie:\n    def __init__(self):\n        self.root = {}\n    def insert(self, word: str) -> None:\n        node = self.root\n        for ch in word:\n            if ch not in node: node[ch] = {}\n            node = node[ch]\n        node['#'] = True\n    def search(self, word: str) -> bool:\n        node = self.root\n        for ch in word:\n            if ch not in node: return False\n            node = node[ch]\n        return '#' in node\n    def startsWith(self, prefix: str) -> bool:\n        node = self.root\n        for ch in prefix:\n            if ch not in node: return False\n            node = node[ch]\n        return True",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_61: ProblemSeed = {
  "title": "Design Add and Search Words Data Structure",
  "description": "Design a data structure that supports adding new words and finding if a string matches any previously added string.\nImplement the WordDictionary class:\n- WordDictionary() Initializes the object.\n- void addWord(word) Adds word to the data structure, it can be matched later.\n- bool search(word) Returns true if there is any string in the data structure that matches word or false otherwise. word may contain dots '.' where dots can be matched with any letter.",
  "difficulty": "MEDIUM",
  "tags": [
    "Tries",
    "DFS",
    "Design",
    "String"
  ],
  "constraints": "1 <= word.length <= 25\nword in addWord consists of lowercase English letters.\nword in search consist of '.' or lowercase English letters.\nAt most 10^4 calls will be made to addWord and search.",
  "hints": "When encountering '.', iterate over all child branches recursively.",
  "editorial": "Approach: Standard Trie. In search, if character is '.', recurse through all children. If non-dot, follow specific child.\nTime Complexity: addWord O(L), search O(26^L) worst case\nSpace Complexity: O(total letters)",
  "testCases": [
    {
      "input": "[\"WordDictionary\",\"addWord\",\"addWord\",\"addWord\",\"search\",\"search\",\"search\",\"search\"]\n[[],[\"bad\"],[\"dad\"],[\"mad\"],[\"pad\"],[\"bad\"],[\".ad\"],[\"b..\"]]",
      "output": "[null,null,null,null,false,true,true,true]"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "[\"WordDictionary\",\"addWord\",\"addWord\",\"addWord\",\"search\",\"search\",\"search\",\"search\"]\n[[],[\"bad\"],[\"dad\"],[\"mad\"],[\"pad\"],[\"bad\"],[\".ad\"],[\"b..\"]]",
      "output": "[null,null,null,null,false,true,true,true]",
      "explanation": "Matches words including '.' wildcards."
    },
    "PYTHON": {
      "input": "[\"WordDictionary\",\"addWord\",\"addWord\",\"addWord\",\"search\",\"search\",\"search\",\"search\"]\n[[],[\"bad\"],[\"dad\"],[\"mad\"],[\"pad\"],[\"bad\"],[\".ad\"],[\"b..\"]]",
      "output": "[null,null,null,null,false,true,true,true]",
      "explanation": "Matches words including '.' wildcards."
    },
    "JAVA": {
      "input": "[\"WordDictionary\",\"addWord\",\"addWord\",\"addWord\",\"search\",\"search\",\"search\",\"search\"]\n[[],[\"bad\"],[\"dad\"],[\"mad\"],[\"pad\"],[\"bad\"],[\".ad\"],[\"b..\"]]",
      "output": "[null,null,null,null,false,true,true,true]",
      "explanation": "Matches words including '.' wildcards."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "class WordDictionary {\n  constructor() {\n    this.root = {};\n  }\n  addWord(word) {\n    // Write your code here\n  }\n  search(word) {\n    // Write your code here\n  }\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  const ops = JSON.parse(lines[0]);\n  const args = JSON.parse(lines[1]);\n  let dict = null;\n  const res = [];\n  for (let i = 0; i < ops.length; i++) {\n    if (ops[i] === 'WordDictionary') { dict = new WordDictionary(); res.push(null); }\n    else if (ops[i] === 'addWord') { dict.addWord(args[i][0]); res.push(null); }\n    else if (ops[i] === 'search') { res.push(dict.search(args[i][0])); }\n  }\n  console.log(JSON.stringify(res));\n});",
    "PYTHON": "import sys, json\nclass WordDictionary:\n    def __init__(self):\n        pass\n    def addWord(self, word: str) -> None:\n        pass\n    def search(self, word: str) -> bool:\n        pass",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "class WordDictionary {\n  constructor() {\n    this.root = {};\n  }\n  addWord(word) {\n    let node = this.root;\n    for (const ch of word) {\n      if (!node[ch]) node[ch] = {};\n      node = node[ch];\n    }\n    node.isEnd = true;\n  }\n  search(word) {\n    function dfs(node, idx) {\n      if (!node) return false;\n      if (idx === word.length) return !!node.isEnd;\n      const ch = word[idx];\n      if (ch === '.') {\n        for (const key of Object.keys(node)) {\n          if (key !== 'isEnd' && dfs(node[key], idx + 1)) return true;\n        }\n        return false;\n      } else {\n        return dfs(node[ch], idx + 1);\n      }\n    }\n    return dfs(this.root, 0);\n  }\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  const ops = JSON.parse(lines[0]);\n  const args = JSON.parse(lines[1]);\n  let dict = null;\n  const res = [];\n  for (let i = 0; i < ops.length; i++) {\n    if (ops[i] === 'WordDictionary') { dict = new WordDictionary(); res.push(null); }\n    else if (ops[i] === 'addWord') { dict.addWord(args[i][0]); res.push(null); }\n    else if (ops[i] === 'search') { res.push(dict.search(args[i][0])); }\n  }\n  console.log(JSON.stringify(res));\n});",
    "PYTHON": "import sys, json\nclass WordDictionary:\n    def __init__(self):\n        self.root = {}\n    def addWord(self, word: str) -> None:\n        node = self.root\n        for ch in word:\n            if ch not in node: node[ch] = {}\n            node = node[ch]\n        node['#'] = True\n    def search(self, word: str) -> bool:\n        def dfs(node, i):\n            if not node: return False\n            if i == len(word): return '#' in node\n            ch = word[i]\n            if ch == '.':\n                return any(dfs(child, i + 1) for k, child in node.items() if k != '#')\n            return dfs(node.get(ch), i + 1)\n        return dfs(self.root, 0)",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_62: ProblemSeed = {
  "title": "Word Search II",
  "description": "Given an m x n board of characters and a list of strings words, return all words on the board.\nEach word must be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once in a word.",
  "difficulty": "HARD",
  "tags": [
    "Tries",
    "Backtracking",
    "Matrix",
    "String"
  ],
  "constraints": "m == board.length\nn == board[i].length\n1 <= m, n <= 12\n1 <= words.length <= 3 * 10^4\n1 <= words[i].length <= 10\nboard[i][j] and words[i] consist of lowercase English letters.\nAll strings of words are unique.",
  "hints": "Build a Trie from all words first, then DFS across the board matching against the Trie.",
  "editorial": "Approach: Insert all target words into a Trie. From every board cell, perform DFS backtracking matching adjacent characters with Trie nodes. When a Trie node represents a word, add it to results and remove it from Trie to avoid duplicates.\nTime Complexity: O(m * n * 4^(max_word_len))\nSpace Complexity: O(sum of word lengths)",
  "testCases": [
    {
      "input": "[[\"o\",\"a\",\"a\",\"n\"],[\"e\",\"t\",\"a\",\"e\"],[\"i\",\"h\",\"k\",\"r\"],[\"i\",\"f\",\"l\",\"v\"]]\n[\"oath\",\"pea\",\"eat\",\"rain\"]",
      "output": "[\"oath\",\"eat\"]"
    },
    {
      "input": "[[\"a\",\"b\"],[\"c\",\"d\"]]\n[\"abcb\"]",
      "output": "[]"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "board = [[\"o\",\"a\",\"a\",\"n\"],[\"e\",\"t\",\"a\",\"e\"],[\"i\",\"h\",\"k\",\"r\"],[\"i\",\"f\",\"l\",\"v\"]], words = [\"oath\",\"pea\",\"eat\",\"rain\"]",
      "output": "[\"oath\",\"eat\"]",
      "explanation": "\"oath\" and \"eat\" can be found on the board."
    },
    "PYTHON": {
      "input": "board = [[\"o\",\"a\",\"a\",\"n\"],[\"e\",\"t\",\"a\",\"e\"],[\"i\",\"h\",\"k\",\"r\"],[\"i\",\"f\",\"l\",\"v\"]], words = [\"oath\",\"pea\",\"eat\",\"rain\"]",
      "output": "[\"oath\",\"eat\"]",
      "explanation": "\"oath\" and \"eat\" can be found on the board."
    },
    "JAVA": {
      "input": "board = [[\"o\",\"a\",\"a\",\"n\"],[\"e\",\"t\",\"a\",\"e\"],[\"i\",\"h\",\"k\",\"r\"],[\"i\",\"f\",\"l\",\"v\"]], words = [\"oath\",\"pea\",\"eat\",\"rain\"]",
      "output": "[\"oath\",\"eat\"]",
      "explanation": "\"oath\" and \"eat\" can be found on the board."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "function findWords(board, words) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  const board = JSON.parse(lines[0]);\n  const words = JSON.parse(lines[1]);\n  console.log(JSON.stringify(findWords(board, words)));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def findWords(self, board: list[list[str]], words: list[str]) -> list[str]:\n        pass",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function findWords(board, words) {\n  const root = {};\n  for (const w of words) {\n    let node = root;\n    for (const ch of w) {\n      if (!node[ch]) node[ch] = {};\n      node = node[ch];\n    }\n    node.word = w;\n  }\n  const rows = board.length, cols = board[0].length;\n  const res = [];\n  function dfs(r, c, node) {\n    if (r < 0 || r >= rows || c < 0 || c >= cols) return;\n    const ch = board[r][c];\n    if (ch === '#' || !node[ch]) return;\n    const nextNode = node[ch];\n    if (nextNode.word) {\n      res.push(nextNode.word);\n      delete nextNode.word;\n    }\n    board[r][c] = '#';\n    dfs(r + 1, c, nextNode);\n    dfs(r - 1, c, nextNode);\n    dfs(r, c + 1, nextNode);\n    dfs(r, c - 1, nextNode);\n    board[r][c] = ch;\n  }\n  for (let r = 0; r < rows; r++) {\n    for (let c = 0; c < cols; c++) {\n      dfs(r, c, root);\n    }\n  }\n  return res;\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  const board = JSON.parse(lines[0]);\n  const words = JSON.parse(lines[1]);\n  console.log(JSON.stringify(findWords(board, words)));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def findWords(self, board: list[list[str]], words: list[str]) -> list[str]:\n        root = {}\n        for w in words:\n            node = root\n            for ch in w:\n                node = node.setdefault(ch, {})\n            node['$'] = w\n        res = []\n        R, C = len(board), len(board[0])\n        def dfs(r, c, node):\n            ch = board[r][c]\n            if ch not in node: return\n            nxt = node[ch]\n            if '$' in nxt:\n                res.append(nxt['$'])\n                del nxt['$']\n            board[r][c] = '#'\n            for dr, dc in [(-1,0),(1,0),(0,-1),(0,1)]:\n                nr, nc = r + dr, c + dc\n                if 0 <= nr < R and 0 <= nc < C and board[nr][nc] != '#':\n                    dfs(nr, nc, nxt)\n            board[r][c] = ch\n        for r in range(R):\n            for c in range(C):\n                dfs(r, c, root)\n        return res",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_63: ProblemSeed = {
  "title": "Kth Largest Element in a Stream",
  "description": "Design a class to find the kth largest element in a stream. Note that it is the kth largest element in the sorted order, not the kth distinct element.\nImplement KthLargest class:\n- KthLargest(int k, int[] nums) Initializes the object with the integer k and the stream of integers nums.\n- int add(int val) Appends the integer val to the stream and returns the element representing the kth largest element in the stream.",
  "difficulty": "EASY",
  "tags": [
    "Heap",
    "Design",
    "Data Stream"
  ],
  "constraints": "1 <= k <= 10^4\n0 <= nums.length <= 10^4\n-10^4 <= nums[i], val <= 10^4\nAt most 10^4 calls will be made to add.",
  "hints": "Use a min-heap of size k. The top of the min-heap is always the kth largest element.",
  "editorial": "Approach: Maintain a min-heap of capacity k. When adding an element, push into heap; if heap size exceeds k, pop the smallest. Top is the answer.\nTime Complexity: O(log k) per add\nSpace Complexity: O(k)",
  "testCases": [
    {
      "input": "[\"KthLargest\",\"add\",\"add\",\"add\",\"add\",\"add\"]\n[[3,[4,5,8,2]],[3],[5],[10],[9],[4]]",
      "output": "[null,4,5,5,8,8]"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "[\"KthLargest\",\"add\",\"add\",\"add\",\"add\",\"add\"]\n[[3,[4,5,8,2]],[3],[5],[10],[9],[4]]",
      "output": "[null,4,5,5,8,8]",
      "explanation": "Returns kth largest element after each add."
    },
    "PYTHON": {
      "input": "[\"KthLargest\",\"add\",\"add\",\"add\",\"add\",\"add\"]\n[[3,[4,5,8,2]],[3],[5],[10],[9],[4]]",
      "output": "[null,4,5,5,8,8]",
      "explanation": "Returns kth largest element after each add."
    },
    "JAVA": {
      "input": "[\"KthLargest\",\"add\",\"add\",\"add\",\"add\",\"add\"]\n[[3,[4,5,8,2]],[3],[5],[10],[9],[4]]",
      "output": "[null,4,5,5,8,8]",
      "explanation": "Returns kth largest element after each add."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "class KthLargest {\n  constructor(k, nums) {\n    // Write your code here\n  }\n  add(val) {\n    // Write your code here\n  }\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  const ops = JSON.parse(lines[0]);\n  const args = JSON.parse(lines[1]);\n  let obj = null;\n  const res = [];\n  for (let i = 0; i < ops.length; i++) {\n    if (ops[i] === 'KthLargest') { obj = new KthLargest(args[i][0], args[i][1]); res.push(null); }\n    else if (ops[i] === 'add') { res.push(obj.add(args[i][0])); }\n  }\n  console.log(JSON.stringify(res));\n});",
    "PYTHON": "import sys, json, heapq\nclass KthLargest:\n    def __init__(self, k: int, nums: list[int]):\n        pass\n    def add(self, val: int) -> int:\n        pass",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "class MinHeap {\n  constructor() { this.heap = []; }\n  push(val) {\n    this.heap.push(val);\n    let idx = this.heap.length - 1;\n    while (idx > 0) {\n      const p = Math.floor((idx - 1) / 2);\n      if (this.heap[p] <= this.heap[idx]) break;\n      [this.heap[p], this.heap[idx]] = [this.heap[idx], this.heap[p]];\n      idx = p;\n    }\n  }\n  pop() {\n    const min = this.heap[0];\n    const last = this.heap.pop();\n    if (this.heap.length > 0) {\n      this.heap[0] = last;\n      let idx = 0;\n      while (true) {\n        let left = 2 * idx + 1, right = 2 * idx + 2, smallest = idx;\n        if (left < this.heap.length && this.heap[left] < this.heap[smallest]) smallest = left;\n        if (right < this.heap.length && this.heap[right] < this.heap[smallest]) smallest = right;\n        if (smallest === idx) break;\n        [this.heap[idx], this.heap[smallest]] = [this.heap[smallest], this.heap[idx]];\n        idx = smallest;\n      }\n    }\n    return min;\n  }\n  peek() { return this.heap[0]; }\n  size() { return this.heap.length; }\n}\n\nclass KthLargest {\n  constructor(k, nums) {\n    this.k = k;\n    this.heap = new MinHeap();\n    for (const num of nums) this.add(num);\n  }\n  add(val) {\n    this.heap.push(val);\n    if (this.heap.size() > this.k) this.heap.pop();\n    return this.heap.peek();\n  }\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  const ops = JSON.parse(lines[0]);\n  const args = JSON.parse(lines[1]);\n  let obj = null;\n  const res = [];\n  for (let i = 0; i < ops.length; i++) {\n    if (ops[i] === 'KthLargest') { obj = new KthLargest(args[i][0], args[i][1]); res.push(null); }\n    else if (ops[i] === 'add') { res.push(obj.add(args[i][0])); }\n  }\n  console.log(JSON.stringify(res));\n});",
    "PYTHON": "import sys, json, heapq\nclass KthLargest:\n    def __init__(self, k: int, nums: list[int]):\n        self.k = k\n        self.heap = nums\n        heapq.heapify(self.heap)\n        while len(self.heap) > k:\n            heapq.heappop(self.heap)\n    def add(self, val: int) -> int:\n        heapq.heappush(self.heap, val)\n        if len(self.heap) > self.k:\n            heapq.heappop(self.heap)\n        return self.heap[0]",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_64: ProblemSeed = {
  "title": "Last Stone Weight",
  "description": "You are given an array of integers stones where stones[i] is the weight of the ith stone.\nWe are playing a game with the stones. On each turn, we choose the heaviest two stones and smash them together. Suppose the heaviest two stones have weights x and y with x <= y. The result of this smash is:\n- If x == y, both stones are destroyed, and\n- If x != y, the stone of weight x is destroyed, and the stone of weight y has new weight y - x.\nAt the end of the game, there is at most one stone left. Return the weight of the last remaining stone. If there are no stones left, return 0.",
  "difficulty": "EASY",
  "tags": [
    "Heap",
    "Array",
    "Simulation"
  ],
  "constraints": "1 <= stones.length <= 30\n1 <= stones[i] <= 1000",
  "hints": "Simulate using a max-heap.",
  "editorial": "Approach: Push all stones into a max-heap. Pop two largest y and x. If y > x, push y - x back. Return remaining stone or 0.\nTime Complexity: O(n log n)\nSpace Complexity: O(n)",
  "testCases": [
    {
      "input": "[2,7,4,1,8,1]",
      "output": "1"
    },
    {
      "input": "[1]",
      "output": "1"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "stones = [2,7,4,1,8,1]",
      "output": "1",
      "explanation": "After all turns, 1 is left."
    },
    "PYTHON": {
      "input": "stones = [2,7,4,1,8,1]",
      "output": "1",
      "explanation": "After all turns, 1 is left."
    },
    "JAVA": {
      "input": "stones = [2,7,4,1,8,1]",
      "output": "1",
      "explanation": "After all turns, 1 is left."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "function lastStoneWeight(stones) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(lastStoneWeight(JSON.parse(lines[0])));\n});",
    "PYTHON": "import sys, json, heapq\nclass Solution:\n    def lastStoneWeight(self, stones: list[int]) -> int:\n        pass",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function lastStoneWeight(stones) {\n  const sorted = [...stones].sort((a, b) => a - b);\n  while (sorted.length > 1) {\n    const y = sorted.pop();\n    const x = sorted.pop();\n    if (y > x) {\n      const diff = y - x;\n      let idx = 0;\n      while (idx < sorted.length && sorted[idx] < diff) idx++;\n      sorted.splice(idx, 0, diff);\n    }\n  }\n  return sorted.length === 0 ? 0 : sorted[0];\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(lastStoneWeight(JSON.parse(lines[0])));\n});",
    "PYTHON": "import sys, json, heapq\nclass Solution:\n    def lastStoneWeight(self, stones: list[int]) -> int:\n        h = [-s for s in stones]\n        heapq.heapify(h)\n        while len(h) > 1:\n            y = -heapq.heappop(h)\n            x = -heapq.heappop(h)\n            if y > x:\n                heapq.heappush(h, -(y - x))\n        return -h[0] if h else 0",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_65: ProblemSeed = {
  "title": "K Closest Points to Origin",
  "description": "Given an array of points where points[i] = [xi, yi] represents a point on the X-Y plane and an integer k, return the k closest points to the origin (0, 0).\nThe distance between two points on the X-Y plane is the Euclidean distance (i.e., √(x1 - x2)^2 + (y1 - y2)^2).\nYou may return the answer in any order. The answer is guaranteed to be unique (except for the order that it is in).",
  "difficulty": "MEDIUM",
  "tags": [
    "Heap",
    "Array",
    "Math",
    "Divide and Conquer",
    "Geometry",
    "Sorting",
    "Quickselect"
  ],
  "constraints": "1 <= k <= points.length <= 10^4\n-10^4 <= xi, yi <= 10^4",
  "hints": "Sort points by x^2 + y^2 or maintain a max-heap of size k.",
  "editorial": "Approach: Sort points ascending by x^2 + y^2 and take first k points.\nTime Complexity: O(n log n)\nSpace Complexity: O(1) auxiliary",
  "testCases": [
    {
      "input": "[[1,3],[-2,2]]\n1",
      "output": "[[-2,2]]"
    },
    {
      "input": "[[3,3],[5,-1],[-2,4]]\n2",
      "output": "[[3,3],[-2,4]]"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "points = [[1,3],[-2,2]], k = 1",
      "output": "[[-2,2]]",
      "explanation": "Distance of (-2, 2) is sqrt(8) which is closest."
    },
    "PYTHON": {
      "input": "points = [[1,3],[-2,2]], k = 1",
      "output": "[[-2,2]]",
      "explanation": "Distance of (-2, 2) is sqrt(8) which is closest."
    },
    "JAVA": {
      "input": "points = [[1,3],[-2,2]], k = 1",
      "output": "[[-2,2]]",
      "explanation": "Distance of (-2, 2) is sqrt(8) which is closest."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "function kClosest(points, k) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  const points = JSON.parse(lines[0]);\n  const k = parseInt(lines[1], 10);\n  console.log(JSON.stringify(kClosest(points, k)));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def kClosest(self, points: list[list[int]], k: int) -> list[list[int]]:\n        pass",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function kClosest(points, k) {\n  return points.sort((a, b) => (a[0]**2 + a[1]**2) - (b[0]**2 + b[1]**2)).slice(0, k);\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  const points = JSON.parse(lines[0]);\n  const k = parseInt(lines[1], 10);\n  console.log(JSON.stringify(kClosest(points, k)));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def kClosest(self, points: list[list[int]], k: int) -> list[list[int]]:\n        points.sort(key=lambda p: p[0]**2 + p[1]**2)\n        return points[:k]",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_66: ProblemSeed = {
  "title": "Kth Largest Element in an Array",
  "description": "Given an integer array nums and an integer k, return the kth largest element in the array.\nNote that it is the kth largest element in the sorted order, not the kth distinct element.\nCan you solve it without sorting?",
  "difficulty": "MEDIUM",
  "tags": [
    "Heap",
    "Array",
    "Divide and Conquer",
    "Quickselect",
    "Sorting"
  ],
  "constraints": "1 <= k <= nums.length <= 10^5\n-10^4 <= nums[i] <= 10^4",
  "hints": "Use QuickSelect or a Min-Heap of size k.",
  "editorial": "Approach: Sort descending or use quickselect to find element at index k-1 in O(n) average time.\nTime Complexity: O(n) average / O(n log n) sorting\nSpace Complexity: O(1)",
  "testCases": [
    {
      "input": "[3,2,1,5,6,4]\n2",
      "output": "5"
    },
    {
      "input": "[3,2,3,1,2,4,5,5,6]\n4",
      "output": "4"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "nums = [3,2,1,5,6,4], k = 2",
      "output": "5",
      "explanation": "2nd largest is 5."
    },
    "PYTHON": {
      "input": "nums = [3,2,1,5,6,4], k = 2",
      "output": "5",
      "explanation": "2nd largest is 5."
    },
    "JAVA": {
      "input": "nums = [3,2,1,5,6,4], k = 2",
      "output": "5",
      "explanation": "2nd largest is 5."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "function findKthLargest(nums, k) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  const nums = JSON.parse(lines[0]);\n  const k = parseInt(lines[1], 10);\n  console.log(findKthLargest(nums, k));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def findKthLargest(self, nums: list[int], k: int) -> int:\n        pass",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function findKthLargest(nums, k) {\n  nums.sort((a, b) => b - a);\n  return nums[k - 1];\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  const nums = JSON.parse(lines[0]);\n  const k = parseInt(lines[1], 10);\n  console.log(findKthLargest(nums, k));\n});",
    "PYTHON": "import sys, json, heapq\nclass Solution:\n    def findKthLargest(self, nums: list[int], k: int) -> int:\n        return heapq.nlargest(k, nums)[-1]",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_67: ProblemSeed = {
  "title": "Task Scheduler",
  "description": "You are given an array of CPU tasks, each represented by letters A to Z, and a cooling interval n. Each cycle or interval allows the completion of one task. Tasks can be completed in any order, but there's a constraint: identical tasks must be separated by at least n intervals due to cooling time.\n​Return the minimum number of intervals required to complete all tasks.",
  "difficulty": "MEDIUM",
  "tags": [
    "Heap",
    "Array",
    "Greedy",
    "Hash Table",
    "Counting",
    "Sorting"
  ],
  "constraints": "1 <= tasks.length <= 10^4\ntasks[i] is an uppercase English letter.\n0 <= n <= 100",
  "hints": "The task with the highest frequency dictates the minimum number of idle slots.",
  "editorial": "Approach: Count frequencies. Let maxFreq be the highest count. The formula is (maxFreq - 1) * (n + 1) + countOfMaxFreq. The answer is max(tasks.length, formula).\nTime Complexity: O(tasks.length)\nSpace Complexity: O(1)",
  "testCases": [
    {
      "input": "[\"A\",\"A\",\"A\",\"B\",\"B\",\"B\"]\n2",
      "output": "8"
    },
    {
      "input": "[\"A\",\"C\",\"A\",\"B\",\"D\",\"B\"]\n1",
      "output": "6"
    },
    {
      "input": "[\"A\",\"A\",\"A\",\"B\",\"B\",\"B\"]\n3",
      "output": "10"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "tasks = [\"A\",\"A\",\"A\",\"B\",\"B\",\"B\"], n = 2",
      "output": "8",
      "explanation": "A -> B -> idle -> A -> B -> idle -> A -> B takes 8 cycles."
    },
    "PYTHON": {
      "input": "tasks = [\"A\",\"A\",\"A\",\"B\",\"B\",\"B\"], n = 2",
      "output": "8",
      "explanation": "A -> B -> idle -> A -> B -> idle -> A -> B takes 8 cycles."
    },
    "JAVA": {
      "input": "tasks = [\"A\",\"A\",\"A\",\"B\",\"B\",\"B\"], n = 2",
      "output": "8",
      "explanation": "A -> B -> idle -> A -> B -> idle -> A -> B takes 8 cycles."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "function leastInterval(tasks, n) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  const tasks = JSON.parse(lines[0]);\n  const n = parseInt(lines[1], 10);\n  console.log(leastInterval(tasks, n));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def leastInterval(self, tasks: list[str], n: int) -> int:\n        pass",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function leastInterval(tasks, n) {\n  const freq = {};\n  for (const t of tasks) freq[t] = (freq[t] || 0) + 1;\n  const counts = Object.values(freq);\n  const maxFreq = Math.max(...counts);\n  const maxCount = counts.filter(c => c === maxFreq).length;\n  return Math.max(tasks.length, (maxFreq - 1) * (n + 1) + maxCount);\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  const tasks = JSON.parse(lines[0]);\n  const n = parseInt(lines[1], 10);\n  console.log(leastInterval(tasks, n));\n});",
    "PYTHON": "import sys, json\nfrom collections import Counter\nclass Solution:\n    def leastInterval(self, tasks: list[str], n: int) -> int:\n        counts = Counter(tasks)\n        max_f = max(counts.values())\n        max_cnt = sum(1 for v in counts.values() if v == max_f)\n        return max(len(tasks), (max_f - 1) * (n + 1) + max_cnt)",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_68: ProblemSeed = {
  "title": "Design Twitter",
  "description": "Design a simplified version of Twitter where users can post tweets, follow/unfollow another user, and is able to see the 10 most recent tweets in the user's news feed.\nImplement the Twitter class:\n- Twitter() Initializes your twitter object.\n- void postTweet(int userId, int tweetId) Composes a new tweet with ID tweetId by the user userId.\n- List<Integer> getNewsFeed(int userId) Retrieves the 10 most recent tweet IDs in the user's news feed. Each item in the news feed must be posted by users who the user followed or by the user themself. Tweets must be ordered from most recent to least recent.\n- void follow(int followerId, int followeeId) The user with ID followerId started following the user with ID followeeId.\n- void unfollow(int followerId, int followeeId) The user with ID followerId started unfollowing the user with ID followeeId.",
  "difficulty": "MEDIUM",
  "tags": [
    "Heap",
    "Design",
    "Hash Table",
    "Linked List"
  ],
  "constraints": "1 <= userId, followerId, followeeId <= 500\n0 <= tweetId <= 10^4\nAll tweets have distinct IDs.\nAt most 3 * 10^4 calls will be made to postTweet, getNewsFeed, follow, and unfollow.",
  "hints": "Track global timestamp for each tweet to merge feeds using a heap or sort.",
  "editorial": "Approach: Store tweets per user with an increasing timestamp. Maintain a followees set for each user. For getNewsFeed, collect all tweets from user and followees, sort descending by time, return first 10.\nTime Complexity: postTweet O(1), follow/unfollow O(1), getNewsFeed O(F * T log(F * T))\nSpace Complexity: O(total tweets + total follows)",
  "testCases": [
    {
      "input": "[\"Twitter\",\"postTweet\",\"getNewsFeed\",\"follow\",\"postTweet\",\"getNewsFeed\",\"unfollow\",\"getNewsFeed\"]\n[[],[1,5],[1],[1,2],[2,6],[1],[1,2],[1]]",
      "output": "[null,null,[5],null,null,[6,5],null,[5]]"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "[\"Twitter\",\"postTweet\",\"getNewsFeed\",\"follow\",\"postTweet\",\"getNewsFeed\",\"unfollow\",\"getNewsFeed\"]\n[[],[1,5],[1],[1,2],[2,6],[1],[1,2],[1]]",
      "output": "[null,null,[5],null,null,[6,5],null,[5]]",
      "explanation": "Simulates Twitter operations."
    },
    "PYTHON": {
      "input": "[\"Twitter\",\"postTweet\",\"getNewsFeed\",\"follow\",\"postTweet\",\"getNewsFeed\",\"unfollow\",\"getNewsFeed\"]\n[[],[1,5],[1],[1,2],[2,6],[1],[1,2],[1]]",
      "output": "[null,null,[5],null,null,[6,5],null,[5]]",
      "explanation": "Simulates Twitter operations."
    },
    "JAVA": {
      "input": "[\"Twitter\",\"postTweet\",\"getNewsFeed\",\"follow\",\"postTweet\",\"getNewsFeed\",\"unfollow\",\"getNewsFeed\"]\n[[],[1,5],[1],[1,2],[2,6],[1],[1,2],[1]]",
      "output": "[null,null,[5],null,null,[6,5],null,[5]]",
      "explanation": "Simulates Twitter operations."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "class Twitter {\n  constructor() {\n    // Write your code here\n  }\n  postTweet(userId, tweetId) {\n    // Write your code here\n  }\n  getNewsFeed(userId) {\n    // Write your code here\n  }\n  follow(followerId, followeeId) {\n    // Write your code here\n  }\n  unfollow(followerId, followeeId) {\n    // Write your code here\n  }\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  const ops = JSON.parse(lines[0]);\n  const args = JSON.parse(lines[1]);\n  let tw = null;\n  const res = [];\n  for (let i = 0; i < ops.length; i++) {\n    if (ops[i] === 'Twitter') { tw = new Twitter(); res.push(null); }\n    else if (ops[i] === 'postTweet') { tw.postTweet(args[i][0], args[i][1]); res.push(null); }\n    else if (ops[i] === 'getNewsFeed') { res.push(tw.getNewsFeed(args[i][0])); }\n    else if (ops[i] === 'follow') { tw.follow(args[i][0], args[i][1]); res.push(null); }\n    else if (ops[i] === 'unfollow') { tw.unfollow(args[i][0], args[i][1]); res.push(null); }\n  }\n  console.log(JSON.stringify(res));\n});",
    "PYTHON": "import sys, json\nclass Twitter:\n    def __init__(self):\n        pass\n    def postTweet(self, userId: int, tweetId: int) -> None:\n        pass\n    def getNewsFeed(self, userId: int) -> list[int]:\n        pass\n    def follow(self, followerId: int, followeeId: int) -> None:\n        pass\n    def unfollow(self, followerId: int, followeeId: int) -> None:\n        pass",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "class Twitter {\n  constructor() {\n    this.time = 0;\n    this.tweets = new Map(); // userId -> [{time, tweetId}]\n    this.following = new Map(); // userId -> Set(followeeIds)\n  }\n  postTweet(userId, tweetId) {\n    if (!this.tweets.has(userId)) this.tweets.set(userId, []);\n    this.tweets.get(userId).push({ time: ++this.time, tweetId });\n  }\n  getNewsFeed(userId) {\n    const users = new Set(this.following.get(userId) || []);\n    users.add(userId);\n    const allTweets = [];\n    for (const u of users) {\n      const userTweets = this.tweets.get(u) || [];\n      for (let i = Math.max(0, userTweets.length - 10); i < userTweets.length; i++) {\n        allTweets.push(userTweets[i]);\n      }\n    }\n    allTweets.sort((a, b) => b.time - a.time);\n    return allTweets.slice(0, 10).map(t => t.tweetId);\n  }\n  follow(followerId, followeeId) {\n    if (followerId === followeeId) return;\n    if (!this.following.has(followerId)) this.following.set(followerId, new Set());\n    this.following.get(followerId).add(followeeId);\n  }\n  unfollow(followerId, followeeId) {\n    if (this.following.has(followerId)) {\n      this.following.get(followerId).delete(followeeId);\n    }\n  }\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  const ops = JSON.parse(lines[0]);\n  const args = JSON.parse(lines[1]);\n  let tw = null;\n  const res = [];\n  for (let i = 0; i < ops.length; i++) {\n    if (ops[i] === 'Twitter') { tw = new Twitter(); res.push(null); }\n    else if (ops[i] === 'postTweet') { tw.postTweet(args[i][0], args[i][1]); res.push(null); }\n    else if (ops[i] === 'getNewsFeed') { res.push(tw.getNewsFeed(args[i][0])); }\n    else if (ops[i] === 'follow') { tw.follow(args[i][0], args[i][1]); res.push(null); }\n    else if (ops[i] === 'unfollow') { tw.unfollow(args[i][0], args[i][1]); res.push(null); }\n  }\n  console.log(JSON.stringify(res));\n});",
    "PYTHON": "import sys, json\nfrom collections import defaultdict\nclass Twitter:\n    def __init__(self):\n        self.time = 0\n        self.tweets = defaultdict(list)\n        self.follows = defaultdict(set)\n    def postTweet(self, userId: int, tweetId: int) -> None:\n        self.time += 1\n        self.tweets[userId].append((self.time, tweetId))\n    def getNewsFeed(self, userId: int) -> list[int]:\n        users = set(self.follows[userId]) | {userId}\n        all_t = []\n        for u in users:\n            all_t.extend(self.tweets[u][-10:])\n        all_t.sort(key=lambda x: x[0], reverse=True)\n        return [t[1] for t in all_t[:10]]\n    def follow(self, followerId: int, followeeId: int) -> None:\n        self.follows[followerId].add(followeeId)\n    def unfollow(self, followerId: int, followeeId: int) -> None:\n        self.follows[followerId].discard(followeeId)",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_69: ProblemSeed = {
  "title": "Find Median from Data Stream",
  "description": "The median is the middle value in an ordered integer list. If the size of the list is even, there is no middle value, and the median is the mean of the two middle values.\nImplement the MedianFinder class:\n- MedianFinder() initializes the MedianFinder object.\n- void addNum(int num) adds the integer num from the data stream to the data structure.\n- double findMedian() returns the median of all elements so far. Answers within 10^-5 of the actual answer will be accepted.",
  "difficulty": "HARD",
  "tags": [
    "Heap",
    "Design",
    "Two Pointers",
    "Data Stream",
    "Sorting"
  ],
  "constraints": "-10^5 <= num <= 10^5\nThere will be at least one element in the data structure before calling findMedian.\nAt most 5 * 10^4 calls will be made to addNum and findMedian.",
  "hints": "Maintain two heaps: a max-heap for lower half and a min-heap for upper half.",
  "editorial": "Approach: Use two halves: max-heap `small` for numbers <= median, min-heap `large` for numbers >= median. Keep sizes balanced (diff <= 1). Median is either top of larger heap or average of both tops.\nTime Complexity: addNum O(log n), findMedian O(1)\nSpace Complexity: O(n)",
  "testCases": [
    {
      "input": "[\"MedianFinder\",\"addNum\",\"addNum\",\"findMedian\",\"addNum\",\"findMedian\"]\n[[],[1],[2],[],[3],[]]",
      "output": "[null,null,null,1.5,null,2]"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "[\"MedianFinder\",\"addNum\",\"addNum\",\"findMedian\",\"addNum\",\"findMedian\"]\n[[],[1],[2],[],[3],[]]",
      "output": "[null,null,null,1.5,null,2]",
      "explanation": "Medians returned correctly."
    },
    "PYTHON": {
      "input": "[\"MedianFinder\",\"addNum\",\"addNum\",\"findMedian\",\"addNum\",\"findMedian\"]\n[[],[1],[2],[],[3],[]]",
      "output": "[null,null,null,1.5,null,2]",
      "explanation": "Medians returned correctly."
    },
    "JAVA": {
      "input": "[\"MedianFinder\",\"addNum\",\"addNum\",\"findMedian\",\"addNum\",\"findMedian\"]\n[[],[1],[2],[],[3],[]]",
      "output": "[null,null,null,1.5,null,2]",
      "explanation": "Medians returned correctly."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "class MedianFinder {\n  constructor() {\n    // Write your code here\n  }\n  addNum(num) {\n    // Write your code here\n  }\n  findMedian() {\n    // Write your code here\n  }\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  const ops = JSON.parse(lines[0]);\n  const args = JSON.parse(lines[1]);\n  let mf = null;\n  const res = [];\n  for (let i = 0; i < ops.length; i++) {\n    if (ops[i] === 'MedianFinder') { mf = new MedianFinder(); res.push(null); }\n    else if (ops[i] === 'addNum') { mf.addNum(args[i][0]); res.push(null); }\n    else if (ops[i] === 'findMedian') { res.push(mf.findMedian()); }\n  }\n  console.log(JSON.stringify(res));\n});",
    "PYTHON": "import sys, json, heapq\nclass MedianFinder:\n    def __init__(self):\n        pass\n    def addNum(self, num: int) -> None:\n        pass\n    def findMedian(self) -> float:\n        pass",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "class MedianFinder {\n  constructor() {\n    this.arr = [];\n  }\n  addNum(num) {\n    let l = 0, r = this.arr.length;\n    while (l < r) {\n      const m = Math.floor((l + r) / 2);\n      if (this.arr[m] < num) l = m + 1;\n      else r = m;\n    }\n    this.arr.splice(l, 0, num);\n  }\n  findMedian() {\n    const n = this.arr.length;\n    if (n % 2 === 1) return this.arr[Math.floor(n / 2)];\n    return (this.arr[n / 2 - 1] + this.arr[n / 2]) / 2;\n  }\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  const ops = JSON.parse(lines[0]);\n  const args = JSON.parse(lines[1]);\n  let mf = null;\n  const res = [];\n  for (let i = 0; i < ops.length; i++) {\n    if (ops[i] === 'MedianFinder') { mf = new MedianFinder(); res.push(null); }\n    else if (ops[i] === 'addNum') { mf.addNum(args[i][0]); res.push(null); }\n    else if (ops[i] === 'findMedian') { res.push(mf.findMedian()); }\n  }\n  console.log(JSON.stringify(res));\n});",
    "PYTHON": "import sys, json, heapq\nclass MedianFinder:\n    def __init__(self):\n        self.small = [] # max-heap\n        self.large = [] # min-heap\n    def addNum(self, num: int) -> None:\n        heapq.heappush(self.small, -num)\n        heapq.heappush(self.large, -heapq.heappop(self.small))\n        if len(self.large) > len(self.small):\n            heapq.heappush(self.small, -heapq.heappop(self.large))\n    def findMedian(self) -> float:\n        if len(self.small) > len(self.large):\n            return float(-self.small[0])\n        return (-self.small[0] + self.large[0]) / 2.0",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_70: ProblemSeed = {
  "title": "Subsets",
  "description": "Given an integer array nums of unique elements, return all possible subsets (the power set).\nThe solution set must not contain duplicate subsets. Return the solution in any order.",
  "difficulty": "MEDIUM",
  "tags": [
    "Backtracking",
    "Array",
    "Bit Manipulation"
  ],
  "constraints": "1 <= nums.length <= 10\n-10 <= nums[i] <= 10\nAll the numbers of nums are unique.",
  "hints": "At each step, decide whether to include or exclude the current element.",
  "editorial": "Approach: Backtracking. At each index i from 0 to n-1, branch into including nums[i] or skipping it.\nTime Complexity: O(n * 2^n)\nSpace Complexity: O(n)",
  "testCases": [
    {
      "input": "[1,2,3]",
      "output": "[[],[1],[1,2],[1,2,3],[1,3],[2],[2,3],[3]]"
    },
    {
      "input": "[0]",
      "output": "[[],[0]]"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "nums = [1,2,3]",
      "output": "[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]",
      "explanation": "All 8 subsets."
    },
    "PYTHON": {
      "input": "nums = [1,2,3]",
      "output": "[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]",
      "explanation": "All 8 subsets."
    },
    "JAVA": {
      "input": "nums = [1,2,3]",
      "output": "[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]",
      "explanation": "All 8 subsets."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "function subsets(nums) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(JSON.stringify(subsets(JSON.parse(lines[0]))));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def subsets(self, nums: list[int]) -> list[list[int]]:\n        pass",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function subsets(nums) {\n  const res = [];\n  const curr = [];\n  function backtrack(i) {\n    if (i === nums.length) {\n      res.push([...curr]);\n      return;\n    }\n    curr.push(nums[i]);\n    backtrack(i + 1);\n    curr.pop();\n    backtrack(i + 1);\n  }\n  backtrack(0);\n  return res;\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(JSON.stringify(subsets(JSON.parse(lines[0]))));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def subsets(self, nums: list[int]) -> list[list[int]]:\n        res = []\n        curr = []\n        def backtrack(i):\n            if i == len(nums):\n                res.append(list(curr))\n                return\n            curr.append(nums[i])\n            backtrack(i + 1)\n            curr.pop()\n            backtrack(i + 1)\n        backtrack(0)\n        return res",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_71: ProblemSeed = {
  "title": "Combination Sum",
  "description": "Given an array of distinct integers candidates and a target integer target, return a list of all unique combinations of candidates where the chosen numbers sum to target. You may return the combinations in any order.\nThe same number may be chosen from candidates an unlimited number of times. Two combinations are unique if the frequency of at least one of the chosen numbers is different.",
  "difficulty": "MEDIUM",
  "tags": [
    "Backtracking",
    "Array"
  ],
  "constraints": "1 <= candidates.length <= 30\n2 <= candidates[i] <= 40\nAll elements of candidates are distinct.\n1 <= target <= 40",
  "hints": "Recurse with the same index to allow picking the same candidate multiple times.",
  "editorial": "Approach: Backtracking. At index i, either add candidates[i] and recurse with remaining target - candidates[i] at index i, or skip to index i + 1.\nTime Complexity: O(2^target)\nSpace Complexity: O(target)",
  "testCases": [
    {
      "input": "[2,3,6,7]\n7",
      "output": "[[2,2,3],[7]]"
    },
    {
      "input": "[2,3,5]\n8",
      "output": "[[2,2,2,2],[2,3,3],[3,5]]"
    },
    {
      "input": "[2]\n1",
      "output": "[]"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "candidates = [2,3,6,7], target = 7",
      "output": "[[2,2,3],[7]]",
      "explanation": "2 and 3 can form 7, and 7 forms 7."
    },
    "PYTHON": {
      "input": "candidates = [2,3,6,7], target = 7",
      "output": "[[2,2,3],[7]]",
      "explanation": "2 and 3 can form 7, and 7 forms 7."
    },
    "JAVA": {
      "input": "candidates = [2,3,6,7], target = 7",
      "output": "[[2,2,3],[7]]",
      "explanation": "2 and 3 can form 7, and 7 forms 7."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "function combinationSum(candidates, target) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(JSON.stringify(combinationSum(JSON.parse(lines[0]), parseInt(lines[1], 10))));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def combinationSum(self, candidates: list[int], target: int) -> list[list[int]]:\n        pass",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function combinationSum(candidates, target) {\n  const res = [];\n  function backtrack(i, cur, sum) {\n    if (sum === target) { res.push([...cur]); return; }\n    if (sum > target || i >= candidates.length) return;\n    cur.push(candidates[i]);\n    backtrack(i, cur, sum + candidates[i]);\n    cur.pop();\n    backtrack(i + 1, cur, sum);\n  }\n  backtrack(0, [], 0);\n  return res;\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(JSON.stringify(combinationSum(JSON.parse(lines[0]), parseInt(lines[1], 10))));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def combinationSum(self, candidates: list[int], target: int) -> list[list[int]]:\n        res = []\n        def backtrack(i, cur, s):\n            if s == target: res.append(list(cur)); return\n            if s > target or i >= len(candidates): return\n            cur.append(candidates[i])\n            backtrack(i, cur, s + candidates[i])\n            cur.pop()\n            backtrack(i + 1, cur, s)\n        backtrack(0, [], 0)\n        return res",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_72: ProblemSeed = {
  "title": "Permutations",
  "description": "Given an array nums of distinct integers, return all the possible permutations. You can return the answer in any order.",
  "difficulty": "MEDIUM",
  "tags": [
    "Backtracking",
    "Array"
  ],
  "constraints": "1 <= nums.length <= 6\n-10 <= nums[i] <= 10\nAll the integers of nums are unique.",
  "hints": "Track used numbers using a boolean array or set.",
  "editorial": "Approach: Backtracking. Build permutations of length n by picking any unused element at each step.\nTime Complexity: O(n! * n)\nSpace Complexity: O(n)",
  "testCases": [
    {
      "input": "[1,2,3]",
      "output": "[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]"
    },
    {
      "input": "[0,1]",
      "output": "[[0,1],[1,0]]"
    },
    {
      "input": "[1]",
      "output": "[[1]]"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "nums = [1,2,3]",
      "output": "[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]",
      "explanation": "All 6 permutations."
    },
    "PYTHON": {
      "input": "nums = [1,2,3]",
      "output": "[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]",
      "explanation": "All 6 permutations."
    },
    "JAVA": {
      "input": "nums = [1,2,3]",
      "output": "[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]",
      "explanation": "All 6 permutations."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "function permute(nums) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(JSON.stringify(permute(JSON.parse(lines[0]))));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def permute(self, nums: list[int]) -> list[list[int]]:\n        pass",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function permute(nums) {\n  const res = [];\n  const used = new Array(nums.length).fill(false);\n  function backtrack(curr) {\n    if (curr.length === nums.length) { res.push([...curr]); return; }\n    for (let i = 0; i < nums.length; i++) {\n      if (!used[i]) {\n        used[i] = true;\n        curr.push(nums[i]);\n        backtrack(curr);\n        curr.pop();\n        used[i] = false;\n      }\n    }\n  }\n  backtrack([]);\n  return res;\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(JSON.stringify(permute(JSON.parse(lines[0]))));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def permute(self, nums: list[int]) -> list[list[int]]:\n        res = []\n        def backtrack(curr, used):\n            if len(curr) == len(nums): res.append(list(curr)); return\n            for i in range(len(nums)):\n                if not used[i]:\n                    used[i] = True\n                    curr.append(nums[i])\n                    backtrack(curr, used)\n                    curr.pop()\n                    used[i] = False\n        backtrack([], [False]*len(nums))\n        return res",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_73: ProblemSeed = {
  "title": "Subsets II",
  "description": "Given an integer array nums that may contain duplicates, return all possible subsets (the power set).\nThe solution set must not contain duplicate subsets. Return the solution in any order.",
  "difficulty": "MEDIUM",
  "tags": [
    "Backtracking",
    "Array",
    "Bit Manipulation"
  ],
  "constraints": "1 <= nums.length <= 10\n-10 <= nums[i] <= 10",
  "hints": "Sort nums first. When skipping an element, skip all adjacent duplicates.",
  "editorial": "Approach: Sort array. In backtracking, after exploring subsets including nums[i], skip all subsequent elements equal to nums[i] before branching without nums[i].\nTime Complexity: O(n * 2^n)\nSpace Complexity: O(n)",
  "testCases": [
    {
      "input": "[1,2,2]",
      "output": "[[],[1],[1,2],[1,2,2],[2],[2,2]]"
    },
    {
      "input": "[0]",
      "output": "[[],[0]]"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "nums = [1,2,2]",
      "output": "[[],[1],[1,2],[1,2,2],[2],[2,2]]",
      "explanation": "Unique subsets generated."
    },
    "PYTHON": {
      "input": "nums = [1,2,2]",
      "output": "[[],[1],[1,2],[1,2,2],[2],[2,2]]",
      "explanation": "Unique subsets generated."
    },
    "JAVA": {
      "input": "nums = [1,2,2]",
      "output": "[[],[1],[1,2],[1,2,2],[2],[2,2]]",
      "explanation": "Unique subsets generated."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "function subsetsWithDup(nums) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(JSON.stringify(subsetsWithDup(JSON.parse(lines[0]))));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def subsetsWithDup(self, nums: list[int]) -> list[list[int]]:\n        pass",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function subsetsWithDup(nums) {\n  nums.sort((a, b) => a - b);\n  const res = [];\n  const curr = [];\n  function backtrack(i) {\n    if (i === nums.length) { res.push([...curr]); return; }\n    curr.push(nums[i]);\n    backtrack(i + 1);\n    curr.pop();\n    while (i + 1 < nums.length && nums[i] === nums[i + 1]) i++;\n    backtrack(i + 1);\n  }\n  backtrack(0);\n  return res;\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(JSON.stringify(subsetsWithDup(JSON.parse(lines[0]))));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def subsetsWithDup(self, nums: list[int]) -> list[list[int]]:\n        nums.sort()\n        res = []\n        curr = []\n        def backtrack(i):\n            if i == len(nums): res.append(list(curr)); return\n            curr.append(nums[i])\n            backtrack(i + 1)\n            curr.pop()\n            while i + 1 < len(nums) and nums[i] == nums[i+1]: i += 1\n            backtrack(i + 1)\n        backtrack(0)\n        return res",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_74: ProblemSeed = {
  "title": "Combination Sum II",
  "description": "Given a collection of candidate numbers (candidates) and a target number (target), find all unique combinations in candidates where the candidate numbers sum to target.\nEach number in candidates may only be used once in the combination.\nNote: The solution set must not contain duplicate combinations.",
  "difficulty": "MEDIUM",
  "tags": [
    "Backtracking",
    "Array"
  ],
  "constraints": "1 <= candidates.length <= 100\n1 <= candidates[i] <= 50\n1 <= target <= 30",
  "hints": "Sort candidates and skip duplicates at the same tree depth.",
  "editorial": "Approach: Sort array. In loop from start to end, if i > start && candidates[i] === candidates[i - 1], skip to prevent duplicate combinations.\nTime Complexity: O(2^n)\nSpace Complexity: O(n)",
  "testCases": [
    {
      "input": "[10,1,2,7,6,1,5]\n8",
      "output": "[[1,1,6],[1,2,5],[1,7],[2,6]]"
    },
    {
      "input": "[2,5,2,1,2]\n5",
      "output": "[[1,2,2],[5]]"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "candidates = [10,1,2,7,6,1,5], target = 8",
      "output": "[[1,1,6],[1,2,5],[1,7],[2,6]]",
      "explanation": "Unique combinations summing to 8."
    },
    "PYTHON": {
      "input": "candidates = [10,1,2,7,6,1,5], target = 8",
      "output": "[[1,1,6],[1,2,5],[1,7],[2,6]]",
      "explanation": "Unique combinations summing to 8."
    },
    "JAVA": {
      "input": "candidates = [10,1,2,7,6,1,5], target = 8",
      "output": "[[1,1,6],[1,2,5],[1,7],[2,6]]",
      "explanation": "Unique combinations summing to 8."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "function combinationSum2(candidates, target) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(JSON.stringify(combinationSum2(JSON.parse(lines[0]), parseInt(lines[1], 10))));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def combinationSum2(self, candidates: list[int], target: int) -> list[list[int]]:\n        pass",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function combinationSum2(candidates, target) {\n  candidates.sort((a, b) => a - b);\n  const res = [];\n  function backtrack(start, cur, remaining) {\n    if (remaining === 0) { res.push([...cur]); return; }\n    for (let i = start; i < candidates.length; i++) {\n      if (i > start && candidates[i] === candidates[i - 1]) continue;\n      if (candidates[i] > remaining) break;\n      cur.push(candidates[i]);\n      backtrack(i + 1, cur, remaining - candidates[i]);\n      cur.pop();\n    }\n  }\n  backtrack(0, [], target);\n  return res;\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(JSON.stringify(combinationSum2(JSON.parse(lines[0]), parseInt(lines[1], 10))));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def combinationSum2(self, candidates: list[int], target: int) -> list[list[int]]:\n        candidates.sort()\n        res = []\n        def backtrack(start, cur, remaining):\n            if remaining == 0: res.append(list(cur)); return\n            for i in range(start, len(candidates)):\n                if i > start and candidates[i] == candidates[i-1]: continue\n                if candidates[i] > remaining: break\n                cur.append(candidates[i])\n                backtrack(i + 1, cur, remaining - candidates[i])\n                cur.pop()\n        backtrack(0, [], target)\n        return res",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_75: ProblemSeed = {
  "title": "Word Search",
  "description": "Given an m x n grid of characters board and a string word, return true if word exists in the grid.\nThe word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once.",
  "difficulty": "MEDIUM",
  "tags": [
    "Backtracking",
    "Array",
    "Matrix"
  ],
  "constraints": "m == board.length\nn == board[i].length\n1 <= m, n <= 6\n1 <= word.length <= 15\nboard and word consist of only lowercase and uppercase English letters.",
  "hints": "DFS from each matching starting character, marking cells visited and restoring them afterwards.",
  "editorial": "Approach: DFS backtracking from every (r, c) where board[r][c] === word[0]. Mark cell visited with '#' and restore on backtrack.\nTime Complexity: O(m * n * 4^L)\nSpace Complexity: O(L)",
  "testCases": [
    {
      "input": "[[\"A\",\"B\",\"C\",\"E\"],[\"S\",\"F\",\"C\",\"S\"],[\"A\",\"D\",\"E\",\"E\"]]\n\"ABCCED\"",
      "output": "true"
    },
    {
      "input": "[[\"A\",\"B\",\"C\",\"E\"],[\"S\",\"F\",\"C\",\"S\"],[\"A\",\"D\",\"E\",\"E\"]]\n\"SEE\"",
      "output": "true"
    },
    {
      "input": "[[\"A\",\"B\",\"C\",\"E\"],[\"S\",\"F\",\"C\",\"S\"],[\"A\",\"D\",\"E\",\"E\"]]\n\"ABCB\"",
      "output": "false"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "board = [[\"A\",\"B\",\"C\",\"E\"],[\"S\",\"F\",\"C\",\"S\"],[\"A\",\"D\",\"E\",\"E\"]], word = \"ABCCED\"",
      "output": "true",
      "explanation": "Word exists."
    },
    "PYTHON": {
      "input": "board = [[\"A\",\"B\",\"C\",\"E\"],[\"S\",\"F\",\"C\",\"S\"],[\"A\",\"D\",\"E\",\"E\"]], word = \"ABCCED\"",
      "output": "true",
      "explanation": "Word exists."
    },
    "JAVA": {
      "input": "board = [[\"A\",\"B\",\"C\",\"E\"],[\"S\",\"F\",\"C\",\"S\"],[\"A\",\"D\",\"E\",\"E\"]], word = \"ABCCED\"",
      "output": "true",
      "explanation": "Word exists."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "function exist(board, word) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(exist(JSON.parse(lines[0]), JSON.parse(lines[1])));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def exist(self, board: list[list[str]], word: str) -> bool:\n        pass",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function exist(board, word) {\n  const R = board.length, C = board[0].length;\n  function dfs(r, c, i) {\n    if (i === word.length) return true;\n    if (r < 0 || r >= R || c < 0 || c >= C || board[r][c] !== word[i]) return false;\n    const temp = board[r][c];\n    board[r][c] = '#';\n    const res = dfs(r + 1, c, i + 1) || dfs(r - 1, c, i + 1) || dfs(r, c + 1, i + 1) || dfs(r, c - 1, i + 1);\n    board[r][c] = temp;\n    return res;\n  }\n  for (let r = 0; r < R; r++) {\n    for (let c = 0; c < C; c++) {\n      if (dfs(r, c, 0)) return true;\n    }\n  }\n  return false;\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(exist(JSON.parse(lines[0]), JSON.parse(lines[1])));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def exist(self, board: list[list[str]], word: str) -> bool:\n        R, C = len(board), len(board[0])\n        def dfs(r, c, i):\n            if i == len(word): return True\n            if r < 0 or r >= R or c < 0 or c >= C or board[r][c] != word[i]: return False\n            tmp = board[r][c]\n            board[r][c] = '#'\n            res = dfs(r+1,c,i+1) or dfs(r-1,c,i+1) or dfs(r,c+1,i+1) or dfs(r,c-1,i+1)\n            board[r][c] = tmp\n            return res\n        for r in range(R):\n            for c in range(C):\n                if dfs(r, c, 0): return True\n        return False",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_76: ProblemSeed = {
  "title": "Palindrome Partitioning",
  "description": "Given a string s, partition s such that every substring of the partition is a palindrome. Return all possible palindrome partitioning of s.",
  "difficulty": "MEDIUM",
  "tags": [
    "Backtracking",
    "Dynamic Programming",
    "String"
  ],
  "constraints": "1 <= s.length <= 16\ns contains only lowercase English letters.",
  "hints": "Check if prefix s[start..end] is a palindrome, then recurse on remainder.",
  "editorial": "Approach: Backtracking. For every end >= start, if s[start..end] is a palindrome, add it to current partition and recurse from end + 1.\nTime Complexity: O(n * 2^n)\nSpace Complexity: O(n)",
  "testCases": [
    {
      "input": "\"aab\"",
      "output": "[[\"a\",\"a\",\"b\"],[\"aa\",\"b\"]]"
    },
    {
      "input": "\"a\"",
      "output": "[[\"a\"]]"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "s = \"aab\"",
      "output": "[[\"a\",\"a\",\"b\"],[\"aa\",\"b\"]]",
      "explanation": "Both partitions consist of palindromes."
    },
    "PYTHON": {
      "input": "s = \"aab\"",
      "output": "[[\"a\",\"a\",\"b\"],[\"aa\",\"b\"]]",
      "explanation": "Both partitions consist of palindromes."
    },
    "JAVA": {
      "input": "s = \"aab\"",
      "output": "[[\"a\",\"a\",\"b\"],[\"aa\",\"b\"]]",
      "explanation": "Both partitions consist of palindromes."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "function partition(s) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(JSON.stringify(partition(JSON.parse(lines[0]))));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def partition(self, s: str) -> list[list[str]]:\n        pass",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function partition(s) {\n  const res = [];\n  function isPal(l, r) {\n    while (l < r) {\n      if (s[l++] !== s[r--]) return false;\n    }\n    return true;\n  }\n  function backtrack(start, cur) {\n    if (start === s.length) { res.push([...cur]); return; }\n    for (let end = start; end < s.length; end++) {\n      if (isPal(start, end)) {\n        cur.push(s.slice(start, end + 1));\n        backtrack(end + 1, cur);\n        cur.pop();\n      }\n    }\n  }\n  backtrack(0, []);\n  return res;\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(JSON.stringify(partition(JSON.parse(lines[0]))));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def partition(self, s: str) -> list[list[str]]:\n        res = []\n        def is_pal(sub): return sub == sub[::-1]\n        def backtrack(start, cur):\n            if start == len(s): res.append(list(cur)); return\n            for end in range(start + 1, len(s) + 1):\n                sub = s[start:end]\n                if is_pal(sub):\n                    cur.append(sub)\n                    backtrack(end, cur)\n                    cur.pop()\n        backtrack(0, [])\n        return res",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_77: ProblemSeed = {
  "title": "Letter Combinations of a Phone Number",
  "description": "Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent. Return the answer in any order.\nA mapping of digits to letters (just like on the telephone buttons) is given below. Note that 1 does not map to any letters:\n2: abc, 3: def, 4: ghi, 5: jkl, 6: mno, 7: pqrs, 8: tuv, 9: wxyz.",
  "difficulty": "MEDIUM",
  "tags": [
    "Backtracking",
    "Hash Table",
    "String"
  ],
  "constraints": "0 <= digits.length <= 4\ndigits[i] is a digit in the range ['2', '9'].",
  "hints": "Map each digit to its corresponding characters and backtrack.",
  "editorial": "Approach: Backtracking. Map each digit to characters. At index i of digits, loop through mapped letters and recurse to i + 1.\nTime Complexity: O(4^n)\nSpace Complexity: O(n)",
  "testCases": [
    {
      "input": "\"23\"",
      "output": "[\"ad\",\"ae\",\"af\",\"bd\",\"be\",\"bf\",\"cd\",\"ce\",\"cf\"]"
    },
    {
      "input": "\"\"",
      "output": "[]"
    },
    {
      "input": "\"2\"",
      "output": "[\"a\",\"b\",\"c\"]"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "digits = \"23\"",
      "output": "[\"ad\",\"ae\",\"af\",\"bd\",\"be\",\"bf\",\"cd\",\"ce\",\"cf\"]",
      "explanation": "Combinations of '2' (abc) and '3' (def)."
    },
    "PYTHON": {
      "input": "digits = \"23\"",
      "output": "[\"ad\",\"ae\",\"af\",\"bd\",\"be\",\"bf\",\"cd\",\"ce\",\"cf\"]",
      "explanation": "Combinations of '2' (abc) and '3' (def)."
    },
    "JAVA": {
      "input": "digits = \"23\"",
      "output": "[\"ad\",\"ae\",\"af\",\"bd\",\"be\",\"bf\",\"cd\",\"ce\",\"cf\"]",
      "explanation": "Combinations of '2' (abc) and '3' (def)."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "function letterCombinations(digits) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(JSON.stringify(letterCombinations(JSON.parse(lines[0]))));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def letterCombinations(self, digits: str) -> list[str]:\n        pass",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function letterCombinations(digits) {\n  if (!digits || digits.length === 0) return [];\n  const map = {\n    '2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl',\n    '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz'\n  };\n  const res = [];\n  function backtrack(i, cur) {\n    if (i === digits.length) { res.push(cur); return; }\n    for (const ch of map[digits[i]]) {\n      backtrack(i + 1, cur + ch);\n    }\n  }\n  backtrack(0, '');\n  return res;\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(JSON.stringify(letterCombinations(JSON.parse(lines[0]))));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def letterCombinations(self, digits: str) -> list[str]:\n        if not digits: return []\n        mapping = {'2':'abc','3':'def','4':'ghi','5':'jkl','6':'mno','7':'pqrs','8':'tuv','9':'wxyz'}\n        res = []\n        def backtrack(i, cur):\n            if i == len(digits): res.append(cur); return\n            for ch in mapping[digits[i]]:\n                backtrack(i + 1, cur + ch)\n        backtrack(0, '')\n        return res",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_78: ProblemSeed = {
  "title": "N-Queens",
  "description": "The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other.\nGiven an integer n, return all distinct solutions to the n-queens puzzle. You may return the answer in any order.\nEach solution contains a distinct board configuration of the n-queens' placement, where 'Q' and '.' both indicate a queen and an empty space, respectively.",
  "difficulty": "HARD",
  "tags": [
    "Backtracking",
    "Array"
  ],
  "constraints": "1 <= n <= 9",
  "hints": "Track occupied columns, main diagonals (r - c), and anti-diagonals (r + c).",
  "editorial": "Approach: Place queen row by row. Use sets for columns, positive diagonals (r + c), and negative diagonals (r - c) to check safety in O(1).\nTime Complexity: O(n!)\nSpace Complexity: O(n)",
  "testCases": [
    {
      "input": "4",
      "output": "[[\".Q..\",\"...Q\",\"Q...\",\"..Q.\"],[\"..Q.\",\"Q...\",\"...Q\",\".Q..\"]]"
    },
    {
      "input": "1",
      "output": "[[\"Q\"]]"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "n = 4",
      "output": "[[\".Q..\",\"...Q\",\"Q...\",\"..Q.\"],[\"..Q.\",\"Q...\",\"...Q\",\".Q..\"]]",
      "explanation": "Two distinct solutions."
    },
    "PYTHON": {
      "input": "n = 4",
      "output": "[[\".Q..\",\"...Q\",\"Q...\",\"..Q.\"],[\"..Q.\",\"Q...\",\"...Q\",\".Q..\"]]",
      "explanation": "Two distinct solutions."
    },
    "JAVA": {
      "input": "n = 4",
      "output": "[[\".Q..\",\"...Q\",\"Q...\",\"..Q.\"],[\"..Q.\",\"Q...\",\"...Q\",\".Q..\"]]",
      "explanation": "Two distinct solutions."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "function solveNQueens(n) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(JSON.stringify(solveNQueens(parseInt(lines[0], 10))));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def solveNQueens(self, n: int) -> list[list[str]]:\n        pass",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function solveNQueens(n) {\n  const res = [];\n  const cols = new Set(), posDiag = new Set(), negDiag = new Set();\n  const board = Array.from({ length: n }, () => new Array(n).fill('.'));\n  function backtrack(r) {\n    if (r === n) {\n      res.push(board.map(row => row.join('')));\n      return;\n    }\n    for (let c = 0; c < n; c++) {\n      if (cols.has(c) || posDiag.has(r + c) || negDiag.has(r - c)) continue;\n      cols.add(c); posDiag.add(r + c); negDiag.add(r - c);\n      board[r][c] = 'Q';\n      backtrack(r + 1);\n      cols.delete(c); posDiag.delete(r + c); negDiag.delete(r - c);\n      board[r][c] = '.';\n    }\n  }\n  backtrack(0);\n  return res;\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(JSON.stringify(solveNQueens(parseInt(lines[0], 10))));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def solveNQueens(self, n: int) -> list[list[str]]:\n        res = []\n        cols = set()\n        pos_diag = set()\n        neg_diag = set()\n        board = [['.'] * n for _ in range(n)]\n        def backtrack(r):\n            if r == n:\n                res.append([''.join(row) for row in board])\n                return\n            for c in range(n):\n                if c in cols or (r + c) in pos_diag or (r - c) in neg_diag: continue\n                cols.add(c); pos_diag.add(r + c); neg_diag.add(r - c)\n                board[r][c] = 'Q'\n                backtrack(r + 1)\n                cols.remove(c); pos_diag.remove(r + c); neg_diag.remove(r - c)\n                board[r][c] = '.'\n        backtrack(0)\n        return res",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_79: ProblemSeed = {
  "title": "Number of Islands",
  "description": "Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.\nAn island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.",
  "difficulty": "MEDIUM",
  "tags": [
    "Graphs",
    "Array",
    "DFS",
    "BFS",
    "Matrix",
    "Union Find"
  ],
  "constraints": "m == grid.length\nn == grid[i].length\n1 <= m, n <= 300\ngrid[i][j] is '0' or '1'.",
  "hints": "When finding '1', BFS or DFS to sink all connected land to '0', and increment islands count.",
  "editorial": "Approach: Iterate through grid. When encountering '1', increment island count and run BFS/DFS turning all connected '1's into '0'.\nTime Complexity: O(m * n)\nSpace Complexity: O(m * n)",
  "testCases": [
    {
      "input": "[[\"1\",\"1\",\"1\",\"1\",\"0\"],[\"1\",\"1\",\"0\",\"1\",\"0\"],[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"0\",\"0\",\"0\",\"0\",\"0\"]]",
      "output": "1"
    },
    {
      "input": "[[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"0\",\"0\",\"1\",\"0\",\"0\"],[\"0\",\"0\",\"0\",\"1\",\"1\"]]",
      "output": "3"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "grid = [[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"0\",\"0\",\"1\",\"0\",\"0\"],[\"0\",\"0\",\"0\",\"1\",\"1\"]]",
      "output": "3",
      "explanation": "3 separate islands."
    },
    "PYTHON": {
      "input": "grid = [[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"0\",\"0\",\"1\",\"0\",\"0\"],[\"0\",\"0\",\"0\",\"1\",\"1\"]]",
      "output": "3",
      "explanation": "3 separate islands."
    },
    "JAVA": {
      "input": "grid = [[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"0\",\"0\",\"1\",\"0\",\"0\"],[\"0\",\"0\",\"0\",\"1\",\"1\"]]",
      "output": "3",
      "explanation": "3 separate islands."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "function numIslands(grid) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(numIslands(JSON.parse(lines[0])));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def numIslands(self, grid: list[list[str]]) -> int:\n        pass",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function numIslands(grid) {\n  if (!grid || grid.length === 0) return 0;\n  const R = grid.length, C = grid[0].length;\n  let islands = 0;\n  function dfs(r, c) {\n    if (r < 0 || r >= R || c < 0 || c >= C || grid[r][c] !== '1') return;\n    grid[r][c] = '0';\n    dfs(r + 1, c);\n    dfs(r - 1, c);\n    dfs(r, c + 1);\n    dfs(r, c - 1);\n  }\n  for (let r = 0; r < R; r++) {\n    for (let c = 0; c < C; c++) {\n      if (grid[r][c] === '1') {\n        islands++;\n        dfs(r, c);\n      }\n    }\n  }\n  return islands;\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(numIslands(JSON.parse(lines[0])));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def numIslands(self, grid: list[list[str]]) -> int:\n        if not grid: return 0\n        R, C = len(grid), len(grid[0])\n        cnt = 0\n        def dfs(r, c):\n            if r < 0 or r >= R or c < 0 or c >= C or grid[r][c] != '1': return\n            grid[r][c] = '0'\n            dfs(r+1, c); dfs(r-1, c); dfs(r, c+1); dfs(r, c-1)\n        for r in range(R):\n            for c in range(C):\n                if grid[r][c] == '1':\n                    cnt += 1\n                    dfs(r, c)\n        return cnt",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_80: ProblemSeed = {
  "title": "Clone Graph",
  "description": "Given a reference of a node in a connected undirected graph.\nReturn a deep copy (clone) of the graph.\nEach node in the graph contains a value (int) and a list (List[Node]) of its neighbors.",
  "difficulty": "MEDIUM",
  "tags": [
    "Graphs",
    "Hash Table",
    "DFS",
    "BFS"
  ],
  "constraints": "The number of nodes in the graph is in the range [0, 100].\n1 <= Node.val <= 100\nNode.val is unique for each node.\nThere are no repeated edges and no self-loops in the graph.\nThe Graph is connected and all nodes can be visited starting from the given node.",
  "hints": "Use a hash map mapping original nodes to cloned nodes.",
  "editorial": "Approach: DFS traversal mapping each old node to a new cloned node. If node already in map, return clone. Otherwise create clone, put in map, and clone its neighbors recursively.\nTime Complexity: O(V + E)\nSpace Complexity: O(V)",
  "testCases": [
    {
      "input": "[[2,4],[1,3],[2,4],[1,3]]",
      "output": "[[2,4],[1,3],[2,4],[1,3]]"
    },
    {
      "input": "[[]]",
      "output": "[[]]"
    },
    {
      "input": "[]",
      "output": "[]"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "adjList = [[2,4],[1,3],[2,4],[1,3]]",
      "output": "[[2,4],[1,3],[2,4],[1,3]]",
      "explanation": "Graph deeply cloned."
    },
    "PYTHON": {
      "input": "adjList = [[2,4],[1,3],[2,4],[1,3]]",
      "output": "[[2,4],[1,3],[2,4],[1,3]]",
      "explanation": "Graph deeply cloned."
    },
    "JAVA": {
      "input": "adjList = [[2,4],[1,3],[2,4],[1,3]]",
      "output": "[[2,4],[1,3],[2,4],[1,3]]",
      "explanation": "Graph deeply cloned."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "function cloneGraph(adjList) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(JSON.stringify(cloneGraph(JSON.parse(lines[0] || '[]'))));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def cloneGraph(self, adjList: list[list[int]]) -> list[list[int]]:\n        pass",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function cloneGraph(adjList) {\n  if (!adjList || adjList.length === 0) return [];\n  // Returns deep copy of the adjacency list\n  return JSON.parse(JSON.stringify(adjList));\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(JSON.stringify(cloneGraph(JSON.parse(lines[0] || '[]'))));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def cloneGraph(self, adjList: list[list[int]]) -> list[list[int]]:\n        if not adjList: return []\n        return [list(neighbors) for neighbors in adjList]",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_81: ProblemSeed = {
  "title": "Max Area of Island",
  "description": "You are given an m x n binary matrix grid. An island is a group of 1's (representing land) connected 4-directionally (horizontal or vertical.) You may assume all four edges of the grid are surrounded by water.\nThe area of an island is the number of cells with a value 1 in the island.\nReturn the maximum area of an island in grid. If there is no island, return 0.",
  "difficulty": "MEDIUM",
  "tags": [
    "Graphs",
    "Array",
    "DFS",
    "BFS",
    "Matrix",
    "Union Find"
  ],
  "constraints": "m == grid.length\nn == grid[i].length\n1 <= m, n <= 50\ngrid[i][j] is either 0 or 1.",
  "hints": "DFS to calculate area of each connected component of 1s.",
  "editorial": "Approach: Iterate through each cell. When finding a 1, launch DFS returning 1 + sum of areas of neighbors while marking visited cells with 0. Track maximum area.\nTime Complexity: O(m * n)\nSpace Complexity: O(m * n)",
  "testCases": [
    {
      "input": "[[0,0,1,0,0,0,0,1,0,0,0,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,1,1,0,1,0,0,0,0,0,0,0,0],[0,1,0,0,1,1,0,0,1,0,1,0,0],[0,1,0,0,1,1,0,0,1,1,1,0,0],[0,0,0,0,0,0,0,0,0,0,1,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,0,0,0,0,0,0,1,1,0,0,0,0]]",
      "output": "6"
    },
    {
      "input": "[[0,0,0,0,0,0,0,0]]",
      "output": "0"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "grid = [[0,0,1,0,0],[0,1,1,1,0],[0,0,1,0,0]]",
      "output": "5",
      "explanation": "Max island area is 5."
    },
    "PYTHON": {
      "input": "grid = [[0,0,1,0,0],[0,1,1,1,0],[0,0,1,0,0]]",
      "output": "5",
      "explanation": "Max island area is 5."
    },
    "JAVA": {
      "input": "grid = [[0,0,1,0,0],[0,1,1,1,0],[0,0,1,0,0]]",
      "output": "5",
      "explanation": "Max island area is 5."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "function maxAreaOfIsland(grid) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(maxAreaOfIsland(JSON.parse(lines[0])));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def maxAreaOfIsland(self, grid: list[list[int]]) -> int:\n        pass",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function maxAreaOfIsland(grid) {\n  const R = grid.length, C = grid[0].length;\n  let maxArea = 0;\n  function dfs(r, c) {\n    if (r < 0 || r >= R || c < 0 || c >= C || grid[r][c] !== 1) return 0;\n    grid[r][c] = 0;\n    return 1 + dfs(r + 1, c) + dfs(r - 1, c) + dfs(r, c + 1) + dfs(r, c - 1);\n  }\n  for (let r = 0; r < R; r++) {\n    for (let c = 0; c < C; c++) {\n      if (grid[r][c] === 1) {\n        maxArea = Math.max(maxArea, dfs(r, c));\n      }\n    }\n  }\n  return maxArea;\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(maxAreaOfIsland(JSON.parse(lines[0])));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def maxAreaOfIsland(self, grid: list[list[int]]) -> int:\n        R, C = len(grid), len(grid[0])\n        max_a = 0\n        def dfs(r, c):\n            if r < 0 or r >= R or c < 0 or c >= C or grid[r][c] != 1: return 0\n            grid[r][c] = 0\n            return 1 + dfs(r+1,c) + dfs(r-1,c) + dfs(r,c+1) + dfs(r,c-1)\n        for r in range(R):\n            for c in range(C):\n                if grid[r][c] == 1:\n                    max_a = max(max_a, dfs(r, c))\n        return max_a",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_82: ProblemSeed = {
  "title": "Pacific Atlantic Water Flow",
  "description": "There is an m x n rectangular island that borders both the Pacific Ocean and Atlantic Ocean. The Pacific Ocean touches the island's left and top edges, and the Atlantic Ocean touches the island's right and bottom edges.\nReturn a 2D list of grid coordinates result where result[i] = [ri, ci] denotes that rain water can flow from cell (ri, ci) to both the Pacific and Atlantic oceans.",
  "difficulty": "MEDIUM",
  "tags": [
    "Graphs",
    "Array",
    "DFS",
    "BFS",
    "Matrix"
  ],
  "constraints": "m == heights.length\nn == heights[r].length\n1 <= m, n <= 200\n0 <= heights[r][c] <= 10^5",
  "hints": "Search backwards from oceans: start DFS from the Pacific borders and Atlantic borders going uphill.",
  "editorial": "Approach: Run DFS from Pacific edges and from Atlantic edges towards cells with greater or equal height. The answer is the intersection of cells reachable by both.\nTime Complexity: O(m * n)\nSpace Complexity: O(m * n)",
  "testCases": [
    {
      "input": "[[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]",
      "output": "[[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]"
    },
    {
      "input": "[[1]]",
      "output": "[[0,0]]"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "heights = [[1]]",
      "output": "[[0,0]]",
      "explanation": "Cell flows to both oceans."
    },
    "PYTHON": {
      "input": "heights = [[1]]",
      "output": "[[0,0]]",
      "explanation": "Cell flows to both oceans."
    },
    "JAVA": {
      "input": "heights = [[1]]",
      "output": "[[0,0]]",
      "explanation": "Cell flows to both oceans."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "function pacificAtlantic(heights) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(JSON.stringify(pacificAtlantic(JSON.parse(lines[0]))));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def pacificAtlantic(self, heights: list[list[int]]) -> list[list[int]]:\n        pass",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function pacificAtlantic(heights) {\n  const R = heights.length, C = heights[0].length;\n  const pac = Array.from({ length: R }, () => new Array(C).fill(false));\n  const atl = Array.from({ length: R }, () => new Array(C).fill(false));\n  function dfs(r, c, ocean, prevH) {\n    if (r < 0 || r >= R || c < 0 || c >= C || ocean[r][c] || heights[r][c] < prevH) return;\n    ocean[r][c] = true;\n    dfs(r + 1, c, ocean, heights[r][c]);\n    dfs(r - 1, c, ocean, heights[r][c]);\n    dfs(r, c + 1, ocean, heights[r][c]);\n    dfs(r, c - 1, ocean, heights[r][c]);\n  }\n  for (let c = 0; c < C; c++) {\n    dfs(0, c, pac, heights[0][c]);\n    dfs(R - 1, c, atl, heights[R - 1][c]);\n  }\n  for (let r = 0; r < R; r++) {\n    dfs(r, 0, pac, heights[r][0]);\n    dfs(r, C - 1, atl, heights[r][C - 1]);\n  }\n  const res = [];\n  for (let r = 0; r < R; r++) {\n    for (let c = 0; c < C; c++) {\n      if (pac[r][c] && atl[r][c]) res.push([r, c]);\n    }\n  }\n  return res;\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(JSON.stringify(pacificAtlantic(JSON.parse(lines[0]))));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def pacificAtlantic(self, heights: list[list[int]]) -> list[list[int]]:\n        R, C = len(heights), len(heights[0])\n        pac, atl = set(), set()\n        def dfs(r, c, visit, prev_h):\n            if (r, c) in visit or r < 0 or r >= R or c < 0 or c >= C or heights[r][c] < prev_h: return\n            visit.add((r, c))\n            for dr, dc in [(-1,0),(1,0),(0,-1),(0,1)]:\n                dfs(r + dr, c + dc, visit, heights[r][c])\n        for c in range(C):\n            dfs(0, c, pac, heights[0][c])\n            dfs(R - 1, c, atl, heights[R - 1][c])\n        for r in range(R):\n            dfs(r, 0, pac, heights[r][0])\n            dfs(r, C - 1, atl, heights[r][C - 1])\n        return [[r, c] for r in range(R) for c in range(C) if (r, c) in pac and (r, c) in atl]",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_83: ProblemSeed = {
  "title": "Surrounded Regions",
  "description": "Given an m x n matrix board containing 'X' and 'O', capture all regions that are 4-directionally surrounded by 'X'.\nA region is captured by flipping all 'O's into 'X's in that surrounded region.",
  "difficulty": "MEDIUM",
  "tags": [
    "Graphs",
    "Array",
    "DFS",
    "BFS",
    "Matrix",
    "Union Find"
  ],
  "constraints": "m == board.length\nn == board[i].length\n1 <= m, n <= 200\nboard[i][j] is 'X' or 'O'.",
  "hints": "Start DFS from border 'O's and mark them safe. Any remaining 'O' is captured.",
  "editorial": "Approach: Any 'O' connected to the border cannot be captured. Mark border-connected 'O's as 'T'. Then flip all remaining 'O' to 'X', and restore 'T' back to 'O'.\nTime Complexity: O(m * n)\nSpace Complexity: O(m * n)",
  "testCases": [
    {
      "input": "[[\"X\",\"X\",\"X\",\"X\"],[\"X\",\"O\",\"O\",\"X\"],[\"X\",\"X\",\"O\",\"X\"],[\"X\",\"O\",\"X\",\"X\"]]",
      "output": "[[\"X\",\"X\",\"X\",\"X\"],[\"X\",\"X\",\"X\",\"X\"],[\"X\",\"X\",\"X\",\"X\"],[\"X\",\"O\",\"X\",\"X\"]]"
    },
    {
      "input": "[[\"X\"]]",
      "output": "[[\"X\"]]"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "board = [[\"X\",\"X\",\"X\",\"X\"],[\"X\",\"O\",\"O\",\"X\"],[\"X\",\"X\",\"O\",\"X\"],[\"X\",\"O\",\"X\",\"X\"]]",
      "output": "[[\"X\",\"X\",\"X\",\"X\"],[\"X\",\"X\",\"X\",\"X\"],[\"X\",\"X\",\"X\",\"X\"],[\"X\",\"O\",\"X\",\"X\"]]",
      "explanation": "Surrounded 'O's flipped to 'X'."
    },
    "PYTHON": {
      "input": "board = [[\"X\",\"X\",\"X\",\"X\"],[\"X\",\"O\",\"O\",\"X\"],[\"X\",\"X\",\"O\",\"X\"],[\"X\",\"O\",\"X\",\"X\"]]",
      "output": "[[\"X\",\"X\",\"X\",\"X\"],[\"X\",\"X\",\"X\",\"X\"],[\"X\",\"X\",\"X\",\"X\"],[\"X\",\"O\",\"X\",\"X\"]]",
      "explanation": "Surrounded 'O's flipped to 'X'."
    },
    "JAVA": {
      "input": "board = [[\"X\",\"X\",\"X\",\"X\"],[\"X\",\"O\",\"O\",\"X\"],[\"X\",\"X\",\"O\",\"X\"],[\"X\",\"O\",\"X\",\"X\"]]",
      "output": "[[\"X\",\"X\",\"X\",\"X\"],[\"X\",\"X\",\"X\",\"X\"],[\"X\",\"X\",\"X\",\"X\"],[\"X\",\"O\",\"X\",\"X\"]]",
      "explanation": "Surrounded 'O's flipped to 'X'."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "function solve(board) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  const b = JSON.parse(lines[0]);\n  solve(b);\n  console.log(JSON.stringify(b));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def solve(self, board: list[list[str]]) -> None:\n        pass",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function solve(board) {\n  const R = board.length, C = board[0].length;\n  function dfs(r, c) {\n    if (r < 0 || r >= R || c < 0 || c >= C || board[r][c] !== 'O') return;\n    board[r][c] = 'T';\n    dfs(r + 1, c);\n    dfs(r - 1, c);\n    dfs(r, c + 1);\n    dfs(r, c - 1);\n  }\n  for (let r = 0; r < R; r++) {\n    if (board[r][0] === 'O') dfs(r, 0);\n    if (board[r][C - 1] === 'O') dfs(r, C - 1);\n  }\n  for (let c = 0; c < C; c++) {\n    if (board[0][c] === 'O') dfs(0, c);\n    if (board[R - 1][c] === 'O') dfs(R - 1, c);\n  }\n  for (let r = 0; r < R; r++) {\n    for (let c = 0; c < C; c++) {\n      if (board[r][c] === 'O') board[r][c] = 'X';\n      else if (board[r][c] === 'T') board[r][c] = 'O';\n    }\n  }\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  const b = JSON.parse(lines[0]);\n  solve(b);\n  console.log(JSON.stringify(b));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def solve(self, board: list[list[str]]) -> None:\n        R, C = len(board), len(board[0])\n        def dfs(r, c):\n            if r < 0 or r >= R or c < 0 or c >= C or board[r][c] != 'O': return\n            board[r][c] = 'T'\n            dfs(r+1,c); dfs(r-1,c); dfs(r,c+1); dfs(r,c-1)\n        for r in range(R):\n            if board[r][0] == 'O': dfs(r, 0)\n            if board[r][C-1] == 'O': dfs(r, C-1)\n        for c in range(C):\n            if board[0][c] == 'O': dfs(0, c)\n            if board[R-1][c] == 'O': dfs(R-1, c)\n        for r in range(R):\n            for c in range(C):\n                if board[r][c] == 'O': board[r][c] = 'X'\n                elif board[r][c] == 'T': board[r][c] = 'O'",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_84: ProblemSeed = {
  "title": "Rotting Oranges",
  "description": "You are given an m x n grid where each cell can have one of three values:\n- 0 representing an empty cell,\n- 1 representing a fresh orange, or\n- 2 representing a rotten orange.\nEvery minute, any fresh orange that is 4-directionally adjacent to a rotten orange becomes rotten.\nReturn the minimum number of minutes that must elapse until no cell has a fresh orange. If this is impossible, return -1.",
  "difficulty": "MEDIUM",
  "tags": [
    "Graphs",
    "Array",
    "BFS",
    "Matrix"
  ],
  "constraints": "m == grid.length\nn == grid[i].length\n1 <= m, n <= 10\ngrid[i][j] is 0, 1, or 2.",
  "hints": "Multi-source BFS starting with all initially rotten oranges in queue.",
  "editorial": "Approach: Add all initially rotten oranges to a BFS queue and count fresh oranges. In each step, rot adjacent fresh oranges. If fresh count reaches 0, return minutes, else -1.\nTime Complexity: O(m * n)\nSpace Complexity: O(m * n)",
  "testCases": [
    {
      "input": "[[2,1,1],[1,1,0],[0,1,1]]",
      "output": "4"
    },
    {
      "input": "[[2,1,1],[0,1,1],[1,0,1]]",
      "output": "-1"
    },
    {
      "input": "[[0,2]]",
      "output": "0"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "grid = [[2,1,1],[1,1,0],[0,1,1]]",
      "output": "4",
      "explanation": "Oranges rot completely in 4 minutes."
    },
    "PYTHON": {
      "input": "grid = [[2,1,1],[1,1,0],[0,1,1]]",
      "output": "4",
      "explanation": "Oranges rot completely in 4 minutes."
    },
    "JAVA": {
      "input": "grid = [[2,1,1],[1,1,0],[0,1,1]]",
      "output": "4",
      "explanation": "Oranges rot completely in 4 minutes."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "function orangesRotting(grid) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(orangesRotting(JSON.parse(lines[0])));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def orangesRotting(self, grid: list[list[int]]) -> int:\n        pass",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function orangesRotting(grid) {\n  const R = grid.length, C = grid[0].length;\n  const queue = [];\n  let fresh = 0;\n  for (let r = 0; r < R; r++) {\n    for (let c = 0; c < C; c++) {\n      if (grid[r][c] === 2) queue.push([r, c]);\n      else if (grid[r][c] === 1) fresh++;\n    }\n  }\n  if (fresh === 0) return 0;\n  let minutes = 0;\n  const dirs = [[-1,0],[1,0],[0,-1],[0,1]];\n  while (queue.length > 0 && fresh > 0) {\n    const size = queue.length;\n    for (let i = 0; i < size; i++) {\n      const [r, c] = queue.shift();\n      for (const [dr, dc] of dirs) {\n        const nr = r + dr, nc = c + dc;\n        if (nr >= 0 && nr < R && nc >= 0 && nc < C && grid[nr][nc] === 1) {\n          grid[nr][nc] = 2;\n          fresh--;\n          queue.push([nr, nc]);\n        }\n      }\n    }\n    minutes++;\n  }\n  return fresh === 0 ? minutes : -1;\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(orangesRotting(JSON.parse(lines[0])));\n});",
    "PYTHON": "import sys, json\nfrom collections import deque\nclass Solution:\n    def orangesRotting(self, grid: list[list[int]]) -> int:\n        R, C = len(grid), len(grid[0])\n        q = deque()\n        fresh = 0\n        for r in range(R):\n            for c in range(C):\n                if grid[r][c] == 2: q.append((r, c))\n                elif grid[r][c] == 1: fresh += 1\n        if fresh == 0: return 0\n        mins = 0\n        while q and fresh > 0:\n            for _ in range(len(q)):\n                r, c = q.popleft()\n                for dr, dc in [(-1,0),(1,0),(0,-1),(0,1)]:\n                    nr, nc = r + dr, c + dc\n                    if 0 <= nr < R and 0 <= nc < C and grid[nr][nc] == 1:\n                        grid[nr][nc] = 2\n                        fresh -= 1\n                        q.append((nr, nc))\n            mins += 1\n        return mins if fresh == 0 else -1",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_85: ProblemSeed = {
  "title": "Walls and Gates",
  "description": "You are given an m x n grid rooms initialized with these three possible values:\n- -1: A wall or an obstacle.\n- 0: A gate.\n- 2147483647: Empty room (INF).\nFill each empty room with the distance to its nearest gate. If it is impossible to reach a gate, it should be filled with 2147483647.",
  "difficulty": "MEDIUM",
  "tags": [
    "Graphs",
    "Array",
    "BFS",
    "Matrix"
  ],
  "constraints": "m == rooms.length\nn == rooms[i].length\n1 <= m, n <= 250\nrooms[i][j] is -1, 0, or 2^31 - 1",
  "hints": "Multi-source BFS starting simultaneously from all gates (0).",
  "editorial": "Approach: Put all gates (0) into BFS queue. When expanding from (r, c) to (nr, nc) where rooms[nr][nc] === 2147483647, set rooms[nr][nc] = rooms[r][c] + 1 and enqueue.\nTime Complexity: O(m * n)\nSpace Complexity: O(m * n)",
  "testCases": [
    {
      "input": "[[2147483647,-1,0,2147483647],[2147483647,2147483647,2147483647,-1],[2147483647,-1,2147483647,-1],[0,-1,2147483647,2147483647]]",
      "output": "[[3,-1,0,1],[2,2,1,-1],[1,-1,2,-1],[0,-1,3,4]]"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "rooms = [[2147483647,-1,0,2147483647],[2147483647,2147483647,2147483647,-1],[2147483647,-1,2147483647,-1],[0,-1,2147483647,2147483647]]",
      "output": "[[3,-1,0,1],[2,2,1,-1],[1,-1,2,-1],[0,-1,3,4]]",
      "explanation": "Distances to nearest gates calculated."
    },
    "PYTHON": {
      "input": "rooms = [[2147483647,-1,0,2147483647],[2147483647,2147483647,2147483647,-1],[2147483647,-1,2147483647,-1],[0,-1,2147483647,2147483647]]",
      "output": "[[3,-1,0,1],[2,2,1,-1],[1,-1,2,-1],[0,-1,3,4]]",
      "explanation": "Distances to nearest gates calculated."
    },
    "JAVA": {
      "input": "rooms = [[2147483647,-1,0,2147483647],[2147483647,2147483647,2147483647,-1],[2147483647,-1,2147483647,-1],[0,-1,2147483647,2147483647]]",
      "output": "[[3,-1,0,1],[2,2,1,-1],[1,-1,2,-1],[0,-1,3,4]]",
      "explanation": "Distances to nearest gates calculated."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "function wallsAndGates(rooms) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  const rooms = JSON.parse(lines[0]);\n  wallsAndGates(rooms);\n  console.log(JSON.stringify(rooms));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def wallsAndGates(self, rooms: list[list[int]]) -> None:\n        pass",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function wallsAndGates(rooms) {\n  const R = rooms.length, C = rooms[0].length;\n  const queue = [];\n  for (let r = 0; r < R; r++) {\n    for (let c = 0; c < C; c++) {\n      if (rooms[r][c] === 0) queue.push([r, c]);\n    }\n  }\n  const dirs = [[-1,0],[1,0],[0,-1],[0,1]];\n  while (queue.length > 0) {\n    const [r, c] = queue.shift();\n    for (const [dr, dc] of dirs) {\n      const nr = r + dr, nc = c + dc;\n      if (nr >= 0 && nr < R && nc >= 0 && nc < C && rooms[nr][nc] === 2147483647) {\n        rooms[nr][nc] = rooms[r][c] + 1;\n        queue.push([nr, nc]);\n      }\n    }\n  }\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  const rooms = JSON.parse(lines[0]);\n  wallsAndGates(rooms);\n  console.log(JSON.stringify(rooms));\n});",
    "PYTHON": "import sys, json\nfrom collections import deque\nclass Solution:\n    def wallsAndGates(self, rooms: list[list[int]]) -> None:\n        R, C = len(rooms), len(rooms[0])\n        q = deque((r, c) for r in range(R) for c in range(C) if rooms[r][c] == 0)\n        while q:\n            r, c = q.popleft()\n            for dr, dc in [(-1,0),(1,0),(0,-1),(0,1)]:\n                nr, nc = r + dr, c + dc\n                if 0 <= nr < R and 0 <= nc < C and rooms[nr][nc] == 2147483647:\n                    rooms[nr][nc] = rooms[r][c] + 1\n                    q.append((nr, nc))",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_86: ProblemSeed = {
  "title": "Course Schedule",
  "description": "There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai.\nReturn true if you can finish all courses. Otherwise, return false.",
  "difficulty": "MEDIUM",
  "tags": [
    "Graphs",
    "DFS",
    "BFS",
    "Topological Sort"
  ],
  "constraints": "1 <= numCourses <= 2000\n0 <= prerequisites.length <= 5000\nprerequisites[i].length == 2\n0 <= ai, bi < numCourses\nAll the pairs prerequisites[i] are unique.",
  "hints": "Detect cycles in directed graph using Kahn's algorithm or DFS cycle detection.",
  "editorial": "Approach: Topological sort using Kahn's algorithm (indegrees) or DFS cycle detection. If graph is a Directed Acyclic Graph (DAG), return true, else false.\nTime Complexity: O(V + E)\nSpace Complexity: O(V + E)",
  "testCases": [
    {
      "input": "2\n[[1,0]]",
      "output": "true"
    },
    {
      "input": "2\n[[1,0],[0,1]]",
      "output": "false"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "numCourses = 2, prerequisites = [[1,0]]",
      "output": "true",
      "explanation": "Course 0 then course 1."
    },
    "PYTHON": {
      "input": "numCourses = 2, prerequisites = [[1,0]]",
      "output": "true",
      "explanation": "Course 0 then course 1."
    },
    "JAVA": {
      "input": "numCourses = 2, prerequisites = [[1,0]]",
      "output": "true",
      "explanation": "Course 0 then course 1."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "function canFinish(numCourses, prerequisites) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(canFinish(parseInt(lines[0], 10), JSON.parse(lines[1])));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def canFinish(self, numCourses: int, prerequisites: list[list[int]]) -> bool:\n        pass",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function canFinish(numCourses, prerequisites) {\n  const inDegree = new Array(numCourses).fill(0);\n  const adj = Array.from({ length: numCourses }, () => []);\n  for (const [c, pre] of prerequisites) {\n    adj[pre].push(c);\n    inDegree[c]++;\n  }\n  const queue = [];\n  for (let i = 0; i < numCourses; i++) {\n    if (inDegree[i] === 0) queue.push(i);\n  }\n  let taken = 0;\n  while (queue.length) {\n    const course = queue.shift();\n    taken++;\n    for (const next of adj[course]) {\n      inDegree[next]--;\n      if (inDegree[next] === 0) queue.push(next);\n    }\n  }\n  return taken === numCourses;\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(canFinish(parseInt(lines[0], 10), JSON.parse(lines[1])));\n});",
    "PYTHON": "import sys, json\nfrom collections import deque\nclass Solution:\n    def canFinish(self, numCourses: int, prerequisites: list[list[int]]) -> bool:\n        indegree = [0] * numCourses\n        adj = [[] for _ in range(numCourses)]\n        for c, pre in prerequisites:\n            adj[pre].append(c)\n            indegree[c] += 1\n        q = deque([i for i in range(numCourses) if indegree[i] == 0])\n        taken = 0\n        while q:\n            u = q.popleft()\n            taken += 1\n            for v in adj[u]:\n                indegree[v] -= 1\n                if indegree[v] == 0: q.append(v)\n        return taken == numCourses",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_87: ProblemSeed = {
  "title": "Course Schedule II",
  "description": "There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai.\nReturn the ordering of courses you should take to finish all courses. If there are many valid answers, return any of them. If it is impossible to finish all courses, return an empty array.",
  "difficulty": "MEDIUM",
  "tags": [
    "Graphs",
    "DFS",
    "BFS",
    "Topological Sort"
  ],
  "constraints": "1 <= numCourses <= 2000\n0 <= prerequisites.length <= numCourses * (numCourses - 1)\nprerequisites[i].length == 2\n0 <= ai, bi < numCourses\nAll the pairs [ai, bi] are distinct.",
  "hints": "Kahn's algorithm: collect elements as they are popped from queue.",
  "editorial": "Approach: Kahn's algorithm (BFS topological sort). Collect courses in order as indegree reaches 0. If result length equals numCourses, return it, else [].\nTime Complexity: O(V + E)\nSpace Complexity: O(V + E)",
  "testCases": [
    {
      "input": "2\n[[1,0]]",
      "output": "[0,1]"
    },
    {
      "input": "4\n[[1,0],[2,0],[3,1],[3,2]]",
      "output": "[0,1,2,3]"
    },
    {
      "input": "1\n[]",
      "output": "[0]"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "numCourses = 2, prerequisites = [[1,0]]",
      "output": "[0,1]",
      "explanation": "Take course 0 then 1."
    },
    "PYTHON": {
      "input": "numCourses = 2, prerequisites = [[1,0]]",
      "output": "[0,1]",
      "explanation": "Take course 0 then 1."
    },
    "JAVA": {
      "input": "numCourses = 2, prerequisites = [[1,0]]",
      "output": "[0,1]",
      "explanation": "Take course 0 then 1."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "function findOrder(numCourses, prerequisites) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(JSON.stringify(findOrder(parseInt(lines[0], 10), JSON.parse(lines[1]))));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def findOrder(self, numCourses: int, prerequisites: list[list[int]]) -> list[int]:\n        pass",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function findOrder(numCourses, prerequisites) {\n  const inDegree = new Array(numCourses).fill(0);\n  const adj = Array.from({ length: numCourses }, () => []);\n  for (const [c, pre] of prerequisites) {\n    adj[pre].push(c);\n    inDegree[c]++;\n  }\n  const queue = [];\n  for (let i = 0; i < numCourses; i++) {\n    if (inDegree[i] === 0) queue.push(i);\n  }\n  const order = [];\n  while (queue.length) {\n    const course = queue.shift();\n    order.push(course);\n    for (const next of adj[course]) {\n      inDegree[next]--;\n      if (inDegree[next] === 0) queue.push(next);\n    }\n  }\n  return order.length === numCourses ? order : [];\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(JSON.stringify(findOrder(parseInt(lines[0], 10), JSON.parse(lines[1]))));\n});",
    "PYTHON": "import sys, json\nfrom collections import deque\nclass Solution:\n    def findOrder(self, numCourses: int, prerequisites: list[list[int]]) -> list[int]:\n        indegree = [0] * numCourses\n        adj = [[] for _ in range(numCourses)]\n        for c, pre in prerequisites:\n            adj[pre].append(c)\n            indegree[c] += 1\n        q = deque([i for i in range(numCourses) if indegree[i] == 0])\n        order = []\n        while q:\n            u = q.popleft()\n            order.append(u)\n            for v in adj[u]:\n                indegree[v] -= 1\n                if indegree[v] == 0: q.append(v)\n        return order if len(order) == numCourses else []",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_88: ProblemSeed = {
  "title": "Redundant Connection",
  "description": "In this problem, a tree is an undirected graph that is connected and has no cycles.\nYou are given a graph that started as a tree with n nodes labeled from 1 to n, with one additional edge added. The added edge has two different vertices chosen from 1 to n, and was not an edge that already existed. The graph is represented as an array edges of length n where edges[i] = [ai, bi] indicates that there is an edge between nodes ai and bi in the graph.\nReturn an edge that can be removed so that the resulting graph is a tree of n nodes. If there are multiple answers, return the answer that occurs last in the input.",
  "difficulty": "MEDIUM",
  "tags": [
    "Graphs",
    "Union Find",
    "DFS",
    "BFS"
  ],
  "constraints": "n == edges.length\n3 <= n <= 1000\nedges[i].length == 2\n1 <= ai < bi <= edges.length\nai != bi\nThere are no repeated edges.\nThe given graph is connected.",
  "hints": "Use Union Find. The first edge connecting two already-connected vertices forms the cycle.",
  "editorial": "Approach: Disjoint Set Union (DSU / Union Find). Iterate through edges. If find(u) === find(v), this edge creates a cycle and is redundant.\nTime Complexity: O(n * alpha(n))\nSpace Complexity: O(n)",
  "testCases": [
    {
      "input": "[[1,2],[1,3],[2,3]]",
      "output": "[2,3]"
    },
    {
      "input": "[[1,2],[2,3],[3,4],[1,4],[1,5]]",
      "output": "[1,4]"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "edges = [[1,2],[1,3],[2,3]]",
      "output": "[2,3]",
      "explanation": "Removing [2,3] results in a tree."
    },
    "PYTHON": {
      "input": "edges = [[1,2],[1,3],[2,3]]",
      "output": "[2,3]",
      "explanation": "Removing [2,3] results in a tree."
    },
    "JAVA": {
      "input": "edges = [[1,2],[1,3],[2,3]]",
      "output": "[2,3]",
      "explanation": "Removing [2,3] results in a tree."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "function findRedundantConnection(edges) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(JSON.stringify(findRedundantConnection(JSON.parse(lines[0]))));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def findRedundantConnection(self, edges: list[list[int]]) -> list[int]:\n        pass",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function findRedundantConnection(edges) {\n  const n = edges.length;\n  const parent = Array.from({ length: n + 1 }, (_, i) => i);\n  function find(i) {\n    if (parent[i] === i) return i;\n    return parent[i] = find(parent[i]);\n  }\n  function union(i, j) {\n    const rootI = find(i);\n    const rootJ = find(j);\n    if (rootI === rootJ) return false;\n    parent[rootI] = rootJ;\n    return true;\n  }\n  for (const [u, v] of edges) {\n    if (!union(u, v)) return [u, v];\n  }\n  return [];\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(JSON.stringify(findRedundantConnection(JSON.parse(lines[0]))));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def findRedundantConnection(self, edges: list[list[int]]) -> list[int]:\n        n = len(edges)\n        parent = list(range(n + 1))\n        def find(i):\n            if parent[i] == i: return i\n            parent[i] = find(parent[i])\n            return parent[i]\n        def union(i, j):\n            ri, rj = find(i), find(j)\n            if ri == rj: return False\n            parent[ri] = rj\n            return True\n        for u, v in edges:\n            if not union(u, v): return [u, v]\n        return []",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_89: ProblemSeed = {
  "title": "Number of Connected Components in an Undirected Graph",
  "description": "You have a graph of n nodes. You are given an integer n and an array edges where edges[i] = [ai, bi] indicates that there is an edge between ai and bi in the graph.\nReturn the number of connected components in the graph.",
  "difficulty": "MEDIUM",
  "tags": [
    "Graphs",
    "Union Find",
    "DFS",
    "BFS"
  ],
  "constraints": "1 <= n <= 2000\n1 <= edges.length <= 5000\nedges[i].length == 2\n0 <= ai <= bi < n\nai != bi\nThere are no repeated edges.",
  "hints": "Start with n components. Each successful union of two disjoint vertices reduces count by 1.",
  "editorial": "Approach: Union Find initialized with n components. Decrement count whenever two previously disjoint nodes are united.\nTime Complexity: O(n + e * alpha(n))\nSpace Complexity: O(n)",
  "testCases": [
    {
      "input": "5\n[[0,1],[1,2],[3,4]]",
      "output": "2"
    },
    {
      "input": "5\n[[0,1],[1,2],[2,3],[3,4]]",
      "output": "1"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "n = 5, edges = [[0,1],[1,2],[3,4]]",
      "output": "2",
      "explanation": "Two components: {0,1,2} and {3,4}."
    },
    "PYTHON": {
      "input": "n = 5, edges = [[0,1],[1,2],[3,4]]",
      "output": "2",
      "explanation": "Two components: {0,1,2} and {3,4}."
    },
    "JAVA": {
      "input": "n = 5, edges = [[0,1],[1,2],[3,4]]",
      "output": "2",
      "explanation": "Two components: {0,1,2} and {3,4}."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "function countComponents(n, edges) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(countComponents(parseInt(lines[0], 10), JSON.parse(lines[1])));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def countComponents(self, n: int, edges: list[list[int]]) -> int:\n        pass",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function countComponents(n, edges) {\n  const parent = Array.from({ length: n }, (_, i) => i);\n  let count = n;\n  function find(i) {\n    if (parent[i] === i) return i;\n    return parent[i] = find(parent[i]);\n  }\n  function union(i, j) {\n    const rootI = find(i);\n    const rootJ = find(j);\n    if (rootI === rootJ) return false;\n    parent[rootI] = rootJ;\n    count--;\n    return true;\n  }\n  for (const [u, v] of edges) union(u, v);\n  return count;\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(countComponents(parseInt(lines[0], 10), JSON.parse(lines[1])));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def countComponents(self, n: int, edges: list[list[int]]) -> int:\n        parent = list(range(n))\n        count = n\n        def find(i):\n            if parent[i] == i: return i\n            parent[i] = find(parent[i])\n            return parent[i]\n        def union(i, j):\n            nonlocal count\n            ri, rj = find(i), find(j)\n            if ri != rj:\n                parent[ri] = rj\n                count -= 1\n        for u, v in edges: union(u, v)\n        return count",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_90: ProblemSeed = {
  "title": "Graph Valid Tree",
  "description": "Given n nodes labeled from 0 to n - 1 and a list of undirected edges (each edge is a pair of nodes), write a function to check whether these edges make up a valid tree.",
  "difficulty": "MEDIUM",
  "tags": [
    "Graphs",
    "Union Find",
    "DFS",
    "BFS"
  ],
  "constraints": "1 <= n <= 2000\n0 <= edges.length <= 5000\nedges[i].length == 2\n0 <= ai, bi < n\nai != bi\nThere are no self-loops or repeated edges.",
  "hints": "A valid tree of n nodes has exactly n - 1 edges and no cycles.",
  "editorial": "Approach: Check if edges.length === n - 1 and verify the graph is connected with no cycles using Union Find.\nTime Complexity: O(n * alpha(n))\nSpace Complexity: O(n)",
  "testCases": [
    {
      "input": "5\n[[0,1],[0,2],[0,3],[1,4]]",
      "output": "true"
    },
    {
      "input": "5\n[[0,1],[1,2],[2,3],[1,3],[1,4]]",
      "output": "false"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "n = 5, edges = [[0,1],[0,2],[0,3],[1,4]]",
      "output": "true",
      "explanation": "Forms a valid tree."
    },
    "PYTHON": {
      "input": "n = 5, edges = [[0,1],[0,2],[0,3],[1,4]]",
      "output": "true",
      "explanation": "Forms a valid tree."
    },
    "JAVA": {
      "input": "n = 5, edges = [[0,1],[0,2],[0,3],[1,4]]",
      "output": "true",
      "explanation": "Forms a valid tree."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "function validTree(n, edges) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(validTree(parseInt(lines[0], 10), JSON.parse(lines[1])));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def validTree(self, n: int, edges: list[list[int]]) -> bool:\n        pass",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function validTree(n, edges) {\n  if (edges.length !== n - 1) return false;\n  const parent = Array.from({ length: n }, (_, i) => i);\n  function find(i) {\n    if (parent[i] === i) return i;\n    return parent[i] = find(parent[i]);\n  }\n  function union(i, j) {\n    const rootI = find(i);\n    const rootJ = find(j);\n    if (rootI === rootJ) return false;\n    parent[rootI] = rootJ;\n    return true;\n  }\n  for (const [u, v] of edges) {\n    if (!union(u, v)) return false;\n  }\n  return true;\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(validTree(parseInt(lines[0], 10), JSON.parse(lines[1])));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def validTree(self, n: int, edges: list[list[int]]) -> bool:\n        if len(edges) != n - 1: return False\n        parent = list(range(n))\n        def find(i):\n            if parent[i] == i: return i\n            parent[i] = find(parent[i])\n            return parent[i]\n        for u, v in edges:\n            ru, rv = find(u), find(v)\n            if ru == rv: return False\n            parent[ru] = rv\n        return True",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_91: ProblemSeed = {
  "title": "Word Ladder",
  "description": "A transformation sequence from word beginWord to word endWord using a dictionary wordList is a sequence of words beginWord -> s1 -> s2 -> ... -> sk such that:\n- Every adjacent pair of words differs by a single letter.\n- Every si for 1 <= i <= k is in wordList. Note that beginWord does not need to be in wordList.\n- sk == endWord\nGiven two words, beginWord and endWord, and a dictionary wordList, return the number of words in the shortest transformation sequence from beginWord to endWord, or 0 if no such sequence exists.",
  "difficulty": "HARD",
  "tags": [
    "Graphs",
    "Hash Table",
    "String",
    "BFS"
  ],
  "constraints": "1 <= beginWord.length <= 10\nendWord.length == beginWord.length\n1 <= wordList.length <= 5000\nwordList[i].length == beginWord.length\nbeginWord, endWord, and wordList[i] consist of lowercase English letters.\nbeginWord != endWord\nAll the words in wordList are unique.",
  "hints": "BFS finding shortest distance in unweighted word graph.",
  "editorial": "Approach: BFS. Store words in a Set. For the current word, mutate each position with characters 'a' through 'z'. If formed word exists in set, push to queue and delete from set.\nTime Complexity: O(26 * L * N)\nSpace Complexity: O(N)",
  "testCases": [
    {
      "input": "\"hit\"\n\"cog\"\n[\"hot\",\"dot\",\"dog\",\"lot\",\"log\",\"cog\"]",
      "output": "5"
    },
    {
      "input": "\"hit\"\n\"cog\"\n[\"hot\",\"dot\",\"dog\",\"lot\",\"log\"]",
      "output": "0"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "beginWord = \"hit\", endWord = \"cog\", wordList = [\"hot\",\"dot\",\"dog\",\"lot\",\"log\",\"cog\"]",
      "output": "5",
      "explanation": "\"hit\" -> \"hot\" -> \"dot\" -> \"dog\" -> \"cog\""
    },
    "PYTHON": {
      "input": "beginWord = \"hit\", endWord = \"cog\", wordList = [\"hot\",\"dot\",\"dog\",\"lot\",\"log\",\"cog\"]",
      "output": "5",
      "explanation": "\"hit\" -> \"hot\" -> \"dot\" -> \"dog\" -> \"cog\""
    },
    "JAVA": {
      "input": "beginWord = \"hit\", endWord = \"cog\", wordList = [\"hot\",\"dot\",\"dog\",\"lot\",\"log\",\"cog\"]",
      "output": "5",
      "explanation": "\"hit\" -> \"hot\" -> \"dot\" -> \"dog\" -> \"cog\""
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "function ladderLength(beginWord, endWord, wordList) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(ladderLength(JSON.parse(lines[0]), JSON.parse(lines[1]), JSON.parse(lines[2])));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def ladderLength(self, beginWord: str, endWord: str, wordList: list[str]) -> int:\n        pass",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function ladderLength(beginWord, endWord, wordList) {\n  const words = new Set(wordList);\n  if (!words.has(endWord)) return 0;\n  const queue = [[beginWord, 1]];\n  const alphabet = 'abcdefghijklmnopqrstuvwxyz';\n  while (queue.length) {\n    const [word, dist] = queue.shift();\n    if (word === endWord) return dist;\n    for (let i = 0; i < word.length; i++) {\n      for (let j = 0; j < 26; j++) {\n        const next = word.slice(0, i) + alphabet[j] + word.slice(i + 1);\n        if (words.has(next)) {\n          words.delete(next);\n          queue.push([next, dist + 1]);\n        }\n      }\n    }\n  }\n  return 0;\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(ladderLength(JSON.parse(lines[0]), JSON.parse(lines[1]), JSON.parse(lines[2])));\n});",
    "PYTHON": "import sys, json\nfrom collections import deque\nclass Solution:\n    def ladderLength(self, beginWord: str, endWord: str, wordList: list[str]) -> int:\n        words = set(wordList)\n        if endWord not in words: return 0\n        q = deque([(beginWord, 1)])\n        while q:\n            word, dist = q.popleft()\n            if word == endWord: return dist\n            for i in range(len(word)):\n                for c in 'abcdefghijklmnopqrstuvwxyz':\n                    nxt = word[:i] + c + word[i+1:]\n                    if nxt in words:\n                        words.remove(nxt)\n                        q.append((nxt, dist + 1))\n        return 0",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_92: ProblemSeed = {
  "title": "Reconstruct Itinerary",
  "description": "You are given a list of airline tickets where tickets[i] = [fromi, toi] represent the departure and the arrival airports of one flight. Reconstruct the itinerary in order and return it.\nAll of the tickets belong to a man who departs from 'JFK', thus, the itinerary must begin with 'JFK'. If there are multiple valid itineraries, you should return the itinerary that has the smallest lexical order when read as a single string.",
  "difficulty": "HARD",
  "tags": [
    "Graphs",
    "DFS",
    "Eulerian Circuit"
  ],
  "constraints": "1 <= tickets.length <= 300\ntickets[i].length == 2\nfromi.length == 3\ntoi.length == 3\nfromi and toi consist of uppercase English letters.\nfromi != toi",
  "hints": "Hierholzer's algorithm for finding Eulerian path in lexicographical order.",
  "editorial": "Approach: Hierholzer's algorithm. Sort destinations lexicographically. Greedily visit neighbors in lexical order. When stuck, prepend current airport to result.\nTime Complexity: O(E log E)\nSpace Complexity: O(V + E)",
  "testCases": [
    {
      "input": "[[\"MUC\",\"LHR\"],[\"JFK\",\"MUC\"],[\"SFO\",\"SJC\"],[\"LHR\",\"SFO\"]]",
      "output": "[\"JFK\",\"MUC\",\"LHR\",\"SFO\",\"SJC\"]"
    },
    {
      "input": "[[\"JFK\",\"SFO\"],[\"JFK\",\"ATL\"],[\"SFO\",\"ATL\"],[\"ATL\",\"JFK\"],[\"ATL\",\"SFO\"]]",
      "output": "[\"JFK\",\"ATL\",\"JFK\",\"SFO\",\"ATL\",\"SFO\"]"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "tickets = [[\"MUC\",\"LHR\"],[\"JFK\",\"MUC\"],[\"SFO\",\"SJC\"],[\"LHR\",\"SFO\"]]",
      "output": "[\"JFK\",\"MUC\",\"LHR\",\"SFO\",\"SJC\"]",
      "explanation": "Standard itinerary from JFK."
    },
    "PYTHON": {
      "input": "tickets = [[\"MUC\",\"LHR\"],[\"JFK\",\"MUC\"],[\"SFO\",\"SJC\"],[\"LHR\",\"SFO\"]]",
      "output": "[\"JFK\",\"MUC\",\"LHR\",\"SFO\",\"SJC\"]",
      "explanation": "Standard itinerary from JFK."
    },
    "JAVA": {
      "input": "tickets = [[\"MUC\",\"LHR\"],[\"JFK\",\"MUC\"],[\"SFO\",\"SJC\"],[\"LHR\",\"SFO\"]]",
      "output": "[\"JFK\",\"MUC\",\"LHR\",\"SFO\",\"SJC\"]",
      "explanation": "Standard itinerary from JFK."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "function findItinerary(tickets) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(JSON.stringify(findItinerary(JSON.parse(lines[0]))));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def findItinerary(self, tickets: list[list[str]]) -> list[str]:\n        pass",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function findItinerary(tickets) {\n  const adj = {};\n  for (const [from, to] of tickets) {\n    if (!adj[from]) adj[from] = [];\n    adj[from].push(to);\n  }\n  for (const k in adj) adj[k].sort();\n  const res = [];\n  function dfs(curr) {\n    const dests = adj[curr];\n    while (dests && dests.length > 0) {\n      dfs(dests.shift());\n    }\n    res.unshift(curr);\n  }\n  dfs('JFK');\n  return res;\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(JSON.stringify(findItinerary(JSON.parse(lines[0]))));\n});",
    "PYTHON": "import sys, json\nfrom collections import defaultdict\nclass Solution:\n    def findItinerary(self, tickets: list[list[str]]) -> list[str]:\n        adj = defaultdict(list)\n        for u, v in sorted(tickets, reverse=True):\n            adj[u].append(v)\n        res = []\n        def dfs(u):\n            while adj[u]:\n                dfs(adj[u].pop())\n            res.append(u)\n        dfs('JFK')\n        return res[::-1]",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_93: ProblemSeed = {
  "title": "Min Cost to Connect All Points",
  "description": "You are given an array points representing integer coordinates of some points on a 2D-plane, where points[i] = [xi, yi].\nThe cost of connecting two points [xi, yi] and [xj, yj] is the manhattan distance between them: |xi - xj| + |yi - yj|.\nReturn the minimum cost to make all points connected. All points are connected if there is exactly one simple path between any two points.",
  "difficulty": "MEDIUM",
  "tags": [
    "Graphs",
    "Array",
    "Union Find",
    "Minimum Spanning Tree"
  ],
  "constraints": "1 <= points.length <= 1000\n-10^6 <= xi, yi <= 10^6\nAll pairs (xi, yi) are distinct.",
  "hints": "Use Prim's or Kruskal's algorithm to compute the Minimum Spanning Tree.",
  "editorial": "Approach: Prim's algorithm. Start at point 0. Maintain min distance array from MST to each point. Repeatedly add the closest unvisited point to the MST.\nTime Complexity: O(n^2)\nSpace Complexity: O(n)",
  "testCases": [
    {
      "input": "[[0,0],[2,2],[3,10],[5,2],[7,0]]",
      "output": "20"
    },
    {
      "input": "[[3,12],[-2,5],[-4,1]]",
      "output": "18"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "points = [[0,0],[2,2],[3,10],[5,2],[7,0]]",
      "output": "20",
      "explanation": "MST total cost is 20."
    },
    "PYTHON": {
      "input": "points = [[0,0],[2,2],[3,10],[5,2],[7,0]]",
      "output": "20",
      "explanation": "MST total cost is 20."
    },
    "JAVA": {
      "input": "points = [[0,0],[2,2],[3,10],[5,2],[7,0]]",
      "output": "20",
      "explanation": "MST total cost is 20."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "function minCostConnectPoints(points) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(minCostConnectPoints(JSON.parse(lines[0])));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def minCostConnectPoints(self, points: list[list[int]]) -> int:\n        pass",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function minCostConnectPoints(points) {\n  const n = points.length;\n  const minDist = new Array(n).fill(Infinity);\n  const visited = new Array(n).fill(false);\n  minDist[0] = 0;\n  let totalCost = 0;\n  for (let i = 0; i < n; i++) {\n    let u = -1;\n    for (let j = 0; j < n; j++) {\n      if (!visited[j] && (u === -1 || minDist[j] < minDist[u])) u = j;\n    }\n    visited[u] = true;\n    totalCost += minDist[u];\n    for (let v = 0; v < n; v++) {\n      if (!visited[v]) {\n        const dist = Math.abs(points[u][0] - points[v][0]) + Math.abs(points[u][1] - points[v][1]);\n        if (dist < minDist[v]) minDist[v] = dist;\n      }\n    }\n  }\n  return totalCost;\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(minCostConnectPoints(JSON.parse(lines[0])));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def minCostConnectPoints(self, points: list[list[int]]) -> int:\n        n = len(points)\n        min_dist = [float('inf')] * n\n        visited = [False] * n\n        min_dist[0] = 0\n        cost = 0\n        for _ in range(n):\n            u = -1\n            for j in range(n):\n                if not visited[j] and (u == -1 or min_dist[j] < min_dist[u]):\n                    u = j\n            visited[u] = True\n            cost += min_dist[u]\n            for v in range(n):\n                if not visited[v]:\n                    d = abs(points[u][0] - points[v][0]) + abs(points[u][1] - points[v][1])\n                    if d < min_dist[v]: min_dist[v] = d\n        return cost",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_94: ProblemSeed = {
  "title": "Network Delay Time",
  "description": "You are given a network of n nodes, labeled from 1 to n. You are also given times, a list of travel times as directed edges times[i] = [ui, vi, wi], where ui is the source node, vi is the target node, and wi is the time it takes for a signal to travel from source to target.\nWe will send a signal from a given node k. Return the minimum time it takes for all the n nodes to receive the signal. If it is impossible for all the n nodes to receive the signal, return -1.",
  "difficulty": "MEDIUM",
  "tags": [
    "Graphs",
    "Dijkstra",
    "Shortest Path",
    "Heap"
  ],
  "constraints": "1 <= k <= n <= 100\n1 <= times.length <= 6000\ntimes[i].length == 3\n1 <= ui, vi <= n\nui != vi\n0 <= wi <= 100\nAll pairs (ui, vi) are unique.",
  "hints": "Dijkstra's single source shortest path algorithm from node k.",
  "editorial": "Approach: Dijkstra's algorithm. Maintain distances from source k. Pop node with smallest distance, relax its outgoing edges. Return maximum distance, or -1 if any node unreached.\nTime Complexity: O(E log V)\nSpace Complexity: O(V + E)",
  "testCases": [
    {
      "input": "[[2,1,1],[2,3,1],[3,4,1]]\n4\n2",
      "output": "2"
    },
    {
      "input": "[[1,2,1]]\n2\n1",
      "output": "1"
    },
    {
      "input": "[[1,2,1]]\n2\n2",
      "output": "-1"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "times = [[2,1,1],[2,3,1],[3,4,1]], n = 4, k = 2",
      "output": "2",
      "explanation": "All nodes reached in 2 time units."
    },
    "PYTHON": {
      "input": "times = [[2,1,1],[2,3,1],[3,4,1]], n = 4, k = 2",
      "output": "2",
      "explanation": "All nodes reached in 2 time units."
    },
    "JAVA": {
      "input": "times = [[2,1,1],[2,3,1],[3,4,1]], n = 4, k = 2",
      "output": "2",
      "explanation": "All nodes reached in 2 time units."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "function networkDelayTime(times, n, k) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(networkDelayTime(JSON.parse(lines[0]), parseInt(lines[1], 10), parseInt(lines[2], 10)));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def networkDelayTime(self, times: list[list[int]], n: int, k: int) -> int:\n        pass",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function networkDelayTime(times, n, k) {\n  const dist = new Array(n + 1).fill(Infinity);\n  dist[k] = 0;\n  for (let i = 1; i <= n - 1; i++) {\n    for (const [u, v, w] of times) {\n      if (dist[u] !== Infinity && dist[u] + w < dist[v]) {\n        dist[v] = dist[u] + w;\n      }\n    }\n  }\n  let maxTime = 0;\n  for (let i = 1; i <= n; i++) {\n    if (dist[i] === Infinity) return -1;\n    maxTime = Math.max(maxTime, dist[i]);\n  }\n  return maxTime;\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(networkDelayTime(JSON.parse(lines[0]), parseInt(lines[1], 10), parseInt(lines[2], 10)));\n});",
    "PYTHON": "import sys, json, heapq\nfrom collections import defaultdict\nclass Solution:\n    def networkDelayTime(self, times: list[list[int]], n: int, k: int) -> int:\n        adj = defaultdict(list)\n        for u, v, w in times: adj[u].append((v, w))\n        pq = [(0, k)]\n        dist = {}\n        while pq:\n            d, u = heapq.heappop(pq)\n            if u in dist: continue\n            dist[u] = d\n            for v, w in adj[u]:\n                if v not in dist: heapq.heappush(pq, (d + w, v))\n        return max(dist.values()) if len(dist) == n else -1",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_95: ProblemSeed = {
  "title": "Swim in Rising Water",
  "description": "You are given an n x n integer matrix grid where each value grid[i][j] represents the elevation at that point (i, j).\nThe rain starts to fall. At time t, the depth of the water everywhere is t. You can swim from a square to another 4-directionally adjacent square if and only if the elevation of both squares individually are at most t. You can swim infinite distances in zero time. Of course, you must stay within the boundaries of the grid during your swim.\nReturn the least time until you can reach the bottom right square (n - 1, n - 1) if you start at the top left square (0, 0).",
  "difficulty": "HARD",
  "tags": [
    "Graphs",
    "Array",
    "Binary Search",
    "Dijkstra",
    "BFS",
    "Matrix",
    "Union Find"
  ],
  "constraints": "n == grid.length\nn == grid[i].length\n1 <= n <= 50\n0 <= grid[i][j] < n^2\nEach value grid[i][j] is unique.",
  "hints": "Modified Dijkstra's algorithm where edge weight is max(current_elevation, neighbor_elevation).",
  "editorial": "Approach: Dijkstra / BFS with Min-Priority-Queue. Priority is max elevation encountered on path so far. When reaching (n - 1, n - 1), return the current max elevation.\nTime Complexity: O(n^2 log n)\nSpace Complexity: O(n^2)",
  "testCases": [
    {
      "input": "[[0,2],[1,3]]",
      "output": "3"
    },
    {
      "input": "[[0,1,2,3,4],[24,23,22,21,5],[12,13,14,15,16],[11,17,18,19,20],[10,9,8,7,6]]",
      "output": "16"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "grid = [[0,2],[1,3]]",
      "output": "3",
      "explanation": "At t = 3, water rises to reach [1,1]."
    },
    "PYTHON": {
      "input": "grid = [[0,2],[1,3]]",
      "output": "3",
      "explanation": "At t = 3, water rises to reach [1,1]."
    },
    "JAVA": {
      "input": "grid = [[0,2],[1,3]]",
      "output": "3",
      "explanation": "At t = 3, water rises to reach [1,1]."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "function swimInWater(grid) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(swimInWater(JSON.parse(lines[0])));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def swimInWater(self, grid: list[list[int]]) -> int:\n        pass",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function swimInWater(grid) {\n  const n = grid.length;\n  let low = grid[0][0], high = n * n - 1;\n  function canReach(t) {\n    if (grid[0][0] > t) return false;\n    const visited = Array.from({ length: n }, () => new Array(n).fill(false));\n    const q = [[0, 0]];\n    visited[0][0] = true;\n    const dirs = [[-1,0],[1,0],[0,-1],[0,1]];\n    while (q.length) {\n      const [r, c] = q.shift();\n      if (r === n - 1 && c === n - 1) return true;\n      for (const [dr, dc] of dirs) {\n        const nr = r + dr, nc = c + dc;\n        if (nr >= 0 && nr < n && nc >= 0 && nc < n && !visited[nr][nc] && grid[nr][nc] <= t) {\n          visited[nr][nc] = true;\n          q.push([nr, nc]);\n        }\n      }\n    }\n    return false;\n  }\n  while (low < high) {\n    const mid = Math.floor((low + high) / 2);\n    if (canReach(mid)) high = mid;\n    else low = mid + 1;\n  }\n  return low;\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(swimInWater(JSON.parse(lines[0])));\n});",
    "PYTHON": "import sys, json, heapq\nclass Solution:\n    def swimInWater(self, grid: list[list[int]]) -> int:\n        n = len(grid)\n        visited = set([(0, 0)])\n        pq = [(grid[0][0], 0, 0)]\n        while pq:\n            t, r, c = heapq.heappop(pq)\n            if r == n - 1 and c == n - 1: return t\n            for dr, dc in [(-1,0),(1,0),(0,-1),(0,1)]:\n                nr, nc = r + dr, c + dc\n                if 0 <= nr < n and 0 <= nc < n and (nr, nc) not in visited:\n                    visited.add((nr, nc))\n                    heapq.heappush(pq, (max(t, grid[nr][nc]), nr, nc))",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_96: ProblemSeed = {
  "title": "Alien Dictionary",
  "description": "There is a new alien language that uses the English alphabet. However, the order among letters is unknown to you.\nYou are given a list of strings words from the alien language's dictionary, where the strings in words are sorted lexicographically by the rules of this new language.\nReturn a string of the unique letters in the new alien language sorted in lexicographically increasing order by the new language's rules. If there is no solution, return \"\". If there are multiple solutions, return any of them.",
  "difficulty": "HARD",
  "tags": [
    "Graphs",
    "Array",
    "String",
    "Topological Sort"
  ],
  "constraints": "1 <= words.length <= 100\n1 <= words[i].length <= 100\nwords[i] consists of only lowercase English letters.",
  "hints": "Compare adjacent words to extract character precedence relationships.",
  "editorial": "Approach: Build directed graph from adjacent words: first differing character establishes u -> v. Check invalid prefix rule (word1 starts with word2 but len(word1) > len(word2)). Run topological sort.\nTime Complexity: O(C) where C is total length of words\nSpace Complexity: O(U + min(U^2, N)) where U is unique characters",
  "testCases": [
    {
      "input": "[\"wrt\",\"wrf\",\"er\",\"ett\",\"rftt\"]",
      "output": "\"wertf\""
    },
    {
      "input": "[\"z\",\"x\"]",
      "output": "\"zx\""
    },
    {
      "input": "[\"z\",\"x\",\"z\"]",
      "output": "\"\""
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "words = [\"wrt\",\"wrf\",\"er\",\"ett\",\"rftt\"]",
      "output": "\"wertf\"",
      "explanation": "Valid alien alphabet order is 'wertf'."
    },
    "PYTHON": {
      "input": "words = [\"wrt\",\"wrf\",\"er\",\"ett\",\"rftt\"]",
      "output": "\"wertf\"",
      "explanation": "Valid alien alphabet order is 'wertf'."
    },
    "JAVA": {
      "input": "words = [\"wrt\",\"wrf\",\"er\",\"ett\",\"rftt\"]",
      "output": "\"wertf\"",
      "explanation": "Valid alien alphabet order is 'wertf'."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "function alienOrder(words) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(JSON.stringify(alienOrder(JSON.parse(lines[0]))));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def alienOrder(self, words: list[str]) -> str:\n        pass",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function alienOrder(words) {\n  const adj = {};\n  const inDegree = {};\n  for (const w of words) {\n    for (const c of w) {\n      adj[c] = new Set();\n      inDegree[c] = 0;\n    }\n  }\n  for (let i = 0; i < words.length - 1; i++) {\n    const w1 = words[i], w2 = words[i + 1];\n    const minLen = Math.min(w1.length, w2.length);\n    if (w1.length > w2.length && w1.startsWith(w2)) return \"\";\n    for (let j = 0; j < minLen; j++) {\n      if (w1[j] !== w2[j]) {\n        if (!adj[w1[j]].has(w2[j])) {\n          adj[w1[j]].add(w2[j]);\n          inDegree[w2[j]]++;\n        }\n        break;\n      }\n    }\n  }\n  const queue = [];\n  for (const c in inDegree) {\n    if (inDegree[c] === 0) queue.push(c);\n  }\n  let res = \"\";\n  while (queue.length) {\n    const c = queue.shift();\n    res += c;\n    for (const next of adj[c]) {\n      inDegree[next]--;\n      if (inDegree[next] === 0) queue.push(next);\n    }\n  }\n  return res.length === Object.keys(inDegree).length ? res : \"\";\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(JSON.stringify(alienOrder(JSON.parse(lines[0]))));\n});",
    "PYTHON": "import sys, json\nfrom collections import defaultdict, deque\nclass Solution:\n    def alienOrder(self, words: list[str]) -> str:\n        adj = {c: set() for w in words for c in w}\n        for i in range(len(words) - 1):\n            w1, w2 = words[i], words[i + 1]\n            min_len = min(len(w1), len(w2))\n            if len(w1) > len(w2) and w1[:min_len] == w2[:min_len]: return \"\"\n            for j in range(min_len):\n                if w1[j] != w2[j]:\n                    adj[w1[j]].add(w2[j])\n                    break\n        indegree = {c: 0 for c in adj}\n        for u in adj:\n            for v in adj[u]: indegree[v] += 1\n        q = deque([c for c in indegree if indegree[c] == 0])\n        res = []\n        while q:\n            c = q.popleft()\n            res.append(c)\n            for nxt in adj[c]:\n                indegree[nxt] -= 1\n                if indegree[nxt] == 0: q.append(nxt)\n        return \"\".join(res) if len(res) == len(indegree) else \"\"",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_97: ProblemSeed = {
  "title": "Cheapest Flights Within K Stops",
  "description": "There are n cities connected by some number of flights. You are given an array flights where flights[i] = [fromi, toi, pricei] indicates that there is a flight from city fromi to city toi with cost pricei.\nYou are also given three integers src, dst, and k, return the cheapest price from src to dst with at most k stops. If there is no such route, return -1.",
  "difficulty": "MEDIUM",
  "tags": [
    "Graphs",
    "DFS",
    "BFS",
    "Dynamic Programming",
    "Shortest Path"
  ],
  "constraints": "1 <= n <= 100\n0 <= flights.length <= (n * (n - 1) / 2)\nflights[i].length == 3\n0 <= fromi, toi < n\nfromi != toi\n1 <= pricei <= 10^4\n0 <= src, dst, k < n\nsrc != dst",
  "hints": "Bellman-Ford algorithm executed for k + 1 iterations.",
  "editorial": "Approach: Bellman-Ford algorithm run k + 1 times. In each iteration, use prices from previous step to avoid traversing more edges in a single step.\nTime Complexity: O((k + 1) * E)\nSpace Complexity: O(n)",
  "testCases": [
    {
      "input": "4\n[[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]]\n0\n3\n1",
      "output": "700"
    },
    {
      "input": "3\n[[0,1,100],[1,2,100],[0,2,500]]\n0\n2\n1",
      "output": "200"
    },
    {
      "input": "3\n[[0,1,100],[1,2,100],[0,2,500]]\n0\n2\n0",
      "output": "500"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "n = 4, flights = [[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]], src = 0, dst = 3, k = 1",
      "output": "700",
      "explanation": "Path 0 -> 1 -> 3 gives cost 700 with 1 stop."
    },
    "PYTHON": {
      "input": "n = 4, flights = [[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]], src = 0, dst = 3, k = 1",
      "output": "700",
      "explanation": "Path 0 -> 1 -> 3 gives cost 700 with 1 stop."
    },
    "JAVA": {
      "input": "n = 4, flights = [[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]], src = 0, dst = 3, k = 1",
      "output": "700",
      "explanation": "Path 0 -> 1 -> 3 gives cost 700 with 1 stop."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "function findCheapestPrice(n, flights, src, dst, k) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(findCheapestPrice(parseInt(lines[0], 10), JSON.parse(lines[1]), parseInt(lines[2], 10), parseInt(lines[3], 10), parseInt(lines[4], 10)));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def findCheapestPrice(self, n: int, flights: list[list[int]], src: int, dst: int, k: int) -> int:\n        pass",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function findCheapestPrice(n, flights, src, dst, k) {\n  let prices = new Array(n).fill(Infinity);\n  prices[src] = 0;\n  for (let i = 0; i <= k; i++) {\n    const temp = [...prices];\n    for (const [u, v, p] of flights) {\n      if (prices[u] === Infinity) continue;\n      if (prices[u] + p < temp[v]) temp[v] = prices[u] + p;\n    }\n    prices = temp;\n  }\n  return prices[dst] === Infinity ? -1 : prices[dst];\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(findCheapestPrice(parseInt(lines[0], 10), JSON.parse(lines[1]), parseInt(lines[2], 10), parseInt(lines[3], 10), parseInt(lines[4], 10)));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def findCheapestPrice(self, n: int, flights: list[list[int]], src: int, dst: int, k: int) -> int:\n        prices = [float('inf')] * n\n        prices[src] = 0\n        for _ in range(k + 1):\n            temp = list(prices)\n            for u, v, p in flights:\n                if prices[u] != float('inf') and prices[u] + p < temp[v]:\n                    temp[v] = prices[u] + p\n            prices = temp\n        return prices[dst] if prices[dst] != float('inf') else -1",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_98: ProblemSeed = {
  "title": "Min Cost Climbing Stairs",
  "description": "You are given an integer array cost where cost[i] is the cost of ith step on a staircase. Once you pay the cost, you can either climb one or two steps.\nYou can either start from the step with index 0, or the step with index 1.\nReturn the minimum cost to reach the top of the floor.",
  "difficulty": "EASY",
  "tags": [
    "Dynamic Programming",
    "Array"
  ],
  "constraints": "2 <= cost.length <= 1000\n0 <= cost[i] <= 999",
  "hints": "dp[i] = cost[i] + min(dp[i+1], dp[i+2]) working backwards.",
  "editorial": "Approach: Bottom-up dynamic programming. dp[i] = cost[i] + min(dp[i-1], dp[i-2]). Return min(dp[n-1], dp[n-2]).\nTime Complexity: O(n)\nSpace Complexity: O(1)",
  "testCases": [
    {
      "input": "[10,15,20]",
      "output": "15"
    },
    {
      "input": "[1,100,1,1,1,100,1,1,100,1]",
      "output": "6"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "cost = [10,15,20]",
      "output": "15",
      "explanation": "Start on index 1, pay 15 and climb two steps to reach top."
    },
    "PYTHON": {
      "input": "cost = [10,15,20]",
      "output": "15",
      "explanation": "Start on index 1, pay 15 and climb two steps to reach top."
    },
    "JAVA": {
      "input": "cost = [10,15,20]",
      "output": "15",
      "explanation": "Start on index 1, pay 15 and climb two steps to reach top."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "function minCostClimbingStairs(cost) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(minCostClimbingStairs(JSON.parse(lines[0])));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def minCostClimbingStairs(self, cost: list[int]) -> int:\n        pass",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function minCostClimbingStairs(cost) {\n  let downOne = 0, downTwo = 0;\n  for (let i = 2; i <= cost.length; i++) {\n    const temp = downOne;\n    downOne = Math.min(downOne + cost[i - 1], downTwo + cost[i - 2]);\n    downTwo = temp;\n  }\n  return downOne;\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(minCostClimbingStairs(JSON.parse(lines[0])));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def minCostClimbingStairs(self, cost: list[int]) -> int:\n        f1 = f2 = 0\n        for x in reversed(cost):\n            f1, f2 = x + min(f1, f2), f1\n        return min(f1, f2)",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_99: ProblemSeed = {
  "title": "House Robber",
  "description": "You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected and it will automatically contact the police if two adjacent houses were broken into on the same night.\nGiven an integer array nums representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.",
  "difficulty": "MEDIUM",
  "tags": [
    "Dynamic Programming",
    "Array"
  ],
  "constraints": "1 <= nums.length <= 100\n0 <= nums[i] <= 400",
  "hints": "dp[i] = max(dp[i-1], dp[i-2] + nums[i]).",
  "editorial": "Approach: State reduction DP. At house i, choose max of robbing house i (nums[i] + rob2) or skipping it (rob1).\nTime Complexity: O(n)\nSpace Complexity: O(1)",
  "testCases": [
    {
      "input": "[1,2,3,1]",
      "output": "4"
    },
    {
      "input": "[2,7,9,3,1]",
      "output": "12"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "nums = [1,2,3,1]",
      "output": "4",
      "explanation": "Rob house 1 (money = 1) and then house 3 (money = 3). Total = 4."
    },
    "PYTHON": {
      "input": "nums = [1,2,3,1]",
      "output": "4",
      "explanation": "Rob house 1 (money = 1) and then house 3 (money = 3). Total = 4."
    },
    "JAVA": {
      "input": "nums = [1,2,3,1]",
      "output": "4",
      "explanation": "Rob house 1 (money = 1) and then house 3 (money = 3). Total = 4."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "function rob(nums) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(rob(JSON.parse(lines[0])));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def rob(self, nums: list[int]) -> int:\n        pass",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function rob(nums) {\n  let rob1 = 0, rob2 = 0;\n  for (const n of nums) {\n    const temp = Math.max(n + rob1, rob2);\n    rob1 = rob2;\n    rob2 = temp;\n  }\n  return rob2;\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(rob(JSON.parse(lines[0])));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def rob(self, nums: list[int]) -> int:\n        rob1, rob2 = 0, 0\n        for n in nums:\n            rob1, rob2 = rob2, max(n + rob1, rob2)\n        return rob2",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_100: ProblemSeed = {
  "title": "House Robber II",
  "description": "You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed. All houses at this place are arranged in a circle. That means the first house is the neighbor of the last one. Meanwhile, adjacent houses have a security system connected, and it will automatically contact the police if two adjacent houses were broken into on the same night.\nGiven an integer array nums representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.",
  "difficulty": "MEDIUM",
  "tags": [
    "Dynamic Programming",
    "Array"
  ],
  "constraints": "1 <= nums.length <= 100\n0 <= nums[i] <= 1000",
  "hints": "Either rob houses from 0 to n - 2 or from 1 to n - 1.",
  "editorial": "Approach: Because houses are circular, first and last cannot both be robbed. Solve House Robber I for nums[0..n-2] and nums[1..n-1], take maximum.\nTime Complexity: O(n)\nSpace Complexity: O(1)",
  "testCases": [
    {
      "input": "[2,3,2]",
      "output": "3"
    },
    {
      "input": "[1,2,3,1]",
      "output": "4"
    },
    {
      "input": "[1,2,3]",
      "output": "3"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "nums = [2,3,2]",
      "output": "3",
      "explanation": "Cannot rob house 1 and 3 because they are neighbors."
    },
    "PYTHON": {
      "input": "nums = [2,3,2]",
      "output": "3",
      "explanation": "Cannot rob house 1 and 3 because they are neighbors."
    },
    "JAVA": {
      "input": "nums = [2,3,2]",
      "output": "3",
      "explanation": "Cannot rob house 1 and 3 because they are neighbors."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "function rob(nums) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(rob(JSON.parse(lines[0])));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def rob(self, nums: list[int]) -> int:\n        pass",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function rob(nums) {\n  if (nums.length === 1) return nums[0];\n  function robSimple(arr) {\n    let r1 = 0, r2 = 0;\n    for (const n of arr) {\n      const temp = Math.max(n + r1, r2);\n      r1 = r2;\n      r2 = temp;\n    }\n    return r2;\n  }\n  return Math.max(robSimple(nums.slice(0, nums.length - 1)), robSimple(nums.slice(1)));\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(rob(JSON.parse(lines[0])));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def rob(self, nums: list[int]) -> int:\n        if len(nums) == 1: return nums[0]\n        def rob_line(h):\n            r1 = r2 = 0\n            for n in h: r1, r2 = r2, max(n + r1, r2)\n            return r2\n        return max(rob_line(nums[:-1]), rob_line(nums[1:]))",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_101: ProblemSeed = {
  "title": "Longest Palindromic Substring",
  "description": "Given a string s, return the longest palindromic substring in s.",
  "difficulty": "MEDIUM",
  "tags": [
    "Dynamic Programming",
    "String",
    "Two Pointers"
  ],
  "constraints": "1 <= s.length <= 1000\ns consist of only digits and English letters.",
  "hints": "Expand around center for each index (both odd and even length centers).",
  "editorial": "Approach: Expand around centers. For each index i, consider centers at (i, i) and (i, i + 1). Expand outwards as long as characters match.\nTime Complexity: O(n^2)\nSpace Complexity: O(1)",
  "testCases": [
    {
      "input": "\"babad\"",
      "output": "\"bab\""
    },
    {
      "input": "\"cbbd\"",
      "output": "\"bb\""
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "s = \"babad\"",
      "output": "\"bab\"",
      "explanation": "\"aba\" is also a valid answer."
    },
    "PYTHON": {
      "input": "s = \"babad\"",
      "output": "\"bab\"",
      "explanation": "\"aba\" is also a valid answer."
    },
    "JAVA": {
      "input": "s = \"babad\"",
      "output": "\"bab\"",
      "explanation": "\"aba\" is also a valid answer."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "function longestPalindrome(s) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(JSON.stringify(longestPalindrome(JSON.parse(lines[0]))));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def longestPalindrome(self, s: str) -> str:\n        pass",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function longestPalindrome(s) {\n  if (!s || s.length < 1) return \"\";\n  let start = 0, end = 0;\n  function expand(l, r) {\n    while (l >= 0 && r < s.length && s[l] === s[r]) {\n      l--; r++;\n    }\n    return r - l - 1;\n  }\n  for (let i = 0; i < s.length; i++) {\n    const len1 = expand(i, i);\n    const len2 = expand(i, i + 1);\n    const len = Math.max(len1, len2);\n    if (len > end - start) {\n      start = i - Math.floor((len - 1) / 2);\n      end = i + Math.floor(len / 2);\n    }\n  }\n  return s.slice(start, end + 1);\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(JSON.stringify(longestPalindrome(JSON.parse(lines[0]))));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def longestPalindrome(self, s: str) -> str:\n        res = \"\"\n        for i in range(len(s)):\n            for l, r in [(i, i), (i, i + 1)]:\n                while l >= 0 and r < len(s) and s[l] == s[r]:\n                    if (r - l + 1) > len(res):\n                        res = s[l:r+1]\n                    l -= 1\n                    r += 1\n        return res",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_102: ProblemSeed = {
  "title": "Palindromic Substrings",
  "description": "Given a string s, return the number of palindromic substrings in it.\nA string is a palindrome when it reads the same backward as forward.\nA substring is a contiguous sequence of characters within the string.",
  "difficulty": "MEDIUM",
  "tags": [
    "Dynamic Programming",
    "String",
    "Two Pointers"
  ],
  "constraints": "1 <= s.length <= 1000\ns consists of lowercase English letters.",
  "hints": "Expand around centers and count how many expansions succeed.",
  "editorial": "Approach: Count palindromes by expanding around all 2n - 1 centers (each character and each gap).\nTime Complexity: O(n^2)\nSpace Complexity: O(1)",
  "testCases": [
    {
      "input": "\"abc\"",
      "output": "3"
    },
    {
      "input": "\"aaa\"",
      "output": "6"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "s = \"abc\"",
      "output": "3",
      "explanation": "Three palindromic strings: 'a', 'b', 'c'."
    },
    "PYTHON": {
      "input": "s = \"abc\"",
      "output": "3",
      "explanation": "Three palindromic strings: 'a', 'b', 'c'."
    },
    "JAVA": {
      "input": "s = \"abc\"",
      "output": "3",
      "explanation": "Three palindromic strings: 'a', 'b', 'c'."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "function countSubstrings(s) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(countSubstrings(JSON.parse(lines[0])));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def countSubstrings(self, s: str) -> int:\n        pass",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function countSubstrings(s) {\n  let count = 0;\n  function countPal(l, r) {\n    let c = 0;\n    while (l >= 0 && r < s.length && s[l] === s[r]) {\n      c++; l--; r++;\n    }\n    return c;\n  }\n  for (let i = 0; i < s.length; i++) {\n    count += countPal(i, i);\n    count += countPal(i, i + 1);\n  }\n  return count;\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(countSubstrings(JSON.parse(lines[0])));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def countSubstrings(self, s: str) -> int:\n        ans = 0\n        for i in range(len(s)):\n            for l, r in [(i, i), (i, i + 1)]:\n                while l >= 0 and r < len(s) and s[l] == s[r]:\n                    ans += 1\n                    l -= 1\n                    r += 1\n        return ans",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_103: ProblemSeed = {
  "title": "Decode Ways",
  "description": "A message containing letters from A-Z can be encoded into numbers using the following mapping:\n'A' -> \"1\", 'B' -> \"2\", ... 'Z' -> \"26\".\nTo decode an encoded message, all the digits must be grouped then mapped back into letters using the reverse of the mapping. There may be multiple ways.\nGiven a string s containing only digits, return the number of ways to decode it.",
  "difficulty": "MEDIUM",
  "tags": [
    "Dynamic Programming",
    "String"
  ],
  "constraints": "1 <= s.length <= 100\ns contains only digits and may contain leading zero(s).",
  "hints": "dp[i] is ways to decode s[0..i]. Check valid 1-digit and 2-digit numbers.",
  "editorial": "Approach: dp[i] represents number of decodings for prefix of length i. dp[i] += dp[i-1] if single digit is 1-9; dp[i] += dp[i-2] if two digits are 10-26.\nTime Complexity: O(n)\nSpace Complexity: O(1)",
  "testCases": [
    {
      "input": "\"12\"",
      "output": "2"
    },
    {
      "input": "\"226\"",
      "output": "3"
    },
    {
      "input": "\"06\"",
      "output": "0"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "s = \"12\"",
      "output": "2",
      "explanation": "\"12\" could be decoded as \"AB\" (1 2) or \"L\" (12)."
    },
    "PYTHON": {
      "input": "s = \"12\"",
      "output": "2",
      "explanation": "\"12\" could be decoded as \"AB\" (1 2) or \"L\" (12)."
    },
    "JAVA": {
      "input": "s = \"12\"",
      "output": "2",
      "explanation": "\"12\" could be decoded as \"AB\" (1 2) or \"L\" (12)."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "function numDecodings(s) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(numDecodings(JSON.parse(lines[0])));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def numDecodings(self, s: str) -> int:\n        pass",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function numDecodings(s) {\n  if (!s || s[0] === '0') return 0;\n  let prev2 = 1, prev1 = 1;\n  for (let i = 1; i < s.length; i++) {\n    let cur = 0;\n    const oneDigit = parseInt(s[i], 10);\n    const twoDigits = parseInt(s.substring(i - 1, i + 1), 10);\n    if (oneDigit >= 1) cur += prev1;\n    if (twoDigits >= 10 && twoDigits <= 26) cur += prev2;\n    prev2 = prev1;\n    prev1 = cur;\n  }\n  return prev1;\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(numDecodings(JSON.parse(lines[0])));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def numDecodings(self, s: str) -> int:\n        if not s or s[0] == '0': return 0\n        p2, p1 = 1, 1\n        for i in range(1, len(s)):\n            cur = 0\n            if s[i] != '0': cur += p1\n            if 10 <= int(s[i-1:i+1]) <= 26: cur += p2\n            p2, p1 = p1, cur\n        return p1",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_104: ProblemSeed = {
  "title": "Coin Change",
  "description": "You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money.\nReturn the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.\nYou may assume that you have an infinite number of each kind of coin.",
  "difficulty": "MEDIUM",
  "tags": [
    "Dynamic Programming",
    "Array",
    "BFS"
  ],
  "constraints": "1 <= coins.length <= 12\n1 <= coins[i] <= 2^31 - 1\n0 <= amount <= 10^4",
  "hints": "dp[i] = min(dp[i - c] + 1) for each coin c <= i.",
  "editorial": "Approach: Bottom-up DP array of size amount + 1 filled with Infinity. dp[0] = 0. For each coin, update dp[i] = min(dp[i], dp[i - coin] + 1).\nTime Complexity: O(amount * coins.length)\nSpace Complexity: O(amount)",
  "testCases": [
    {
      "input": "[1,2,5]\n11",
      "output": "3"
    },
    {
      "input": "[2]\n3",
      "output": "-1"
    },
    {
      "input": "[1]\n0",
      "output": "0"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "coins = [1,2,5], amount = 11",
      "output": "3",
      "explanation": "11 = 5 + 5 + 1 (3 coins)."
    },
    "PYTHON": {
      "input": "coins = [1,2,5], amount = 11",
      "output": "3",
      "explanation": "11 = 5 + 5 + 1 (3 coins)."
    },
    "JAVA": {
      "input": "coins = [1,2,5], amount = 11",
      "output": "3",
      "explanation": "11 = 5 + 5 + 1 (3 coins)."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "function coinChange(coins, amount) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(coinChange(JSON.parse(lines[0]), parseInt(lines[1], 10)));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def coinChange(self, coins: list[int], amount: int) -> int:\n        pass",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function coinChange(coins, amount) {\n  const dp = new Array(amount + 1).fill(Infinity);\n  dp[0] = 0;\n  for (let i = 1; i <= amount; i++) {\n    for (const c of coins) {\n      if (i - c >= 0) {\n        dp[i] = Math.min(dp[i], dp[i - c] + 1);\n      }\n    }\n  }\n  return dp[amount] === Infinity ? -1 : dp[amount];\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(coinChange(JSON.parse(lines[0]), parseInt(lines[1], 10)));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def coinChange(self, coins: list[int], amount: int) -> int:\n        dp = [float('inf')] * (amount + 1)\n        dp[0] = 0\n        for c in coins:\n            for i in range(c, amount + 1):\n                dp[i] = min(dp[i], dp[i - c] + 1)\n        return dp[amount] if dp[amount] != float('inf') else -1",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_105: ProblemSeed = {
  "title": "Maximum Product Subarray",
  "description": "Given an integer array nums, find a subarray that has the largest product, and return the product.\nThe test cases are generated so that the answer will fit in a 32-bit integer.",
  "difficulty": "MEDIUM",
  "tags": [
    "Dynamic Programming",
    "Array"
  ],
  "constraints": "1 <= nums.length <= 2 * 10^4\n-10 <= nums[i] <= 10\nThe product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.",
  "hints": "Track both current maximum and current minimum products since negative times negative becomes positive.",
  "editorial": "Approach: Maintain curMax and curMin ending at current element. If nums[i] < 0, swap curMax and curMin. Update curMax = max(nums[i], curMax * nums[i]).\nTime Complexity: O(n)\nSpace Complexity: O(1)",
  "testCases": [
    {
      "input": "[2,3,-2,4]",
      "output": "6"
    },
    {
      "input": "[-2,0,-1]",
      "output": "0"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "nums = [2,3,-2,4]",
      "output": "6",
      "explanation": "[2,3] has the largest product 6."
    },
    "PYTHON": {
      "input": "nums = [2,3,-2,4]",
      "output": "6",
      "explanation": "[2,3] has the largest product 6."
    },
    "JAVA": {
      "input": "nums = [2,3,-2,4]",
      "output": "6",
      "explanation": "[2,3] has the largest product 6."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "function maxProduct(nums) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(maxProduct(JSON.parse(lines[0])));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def maxProduct(self, nums: list[int]) -> int:\n        pass",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function maxProduct(nums) {\n  let res = nums[0];\n  let curMax = 1, curMin = 1;\n  for (const n of nums) {\n    if (n < 0) {\n      const temp = curMax;\n      curMax = curMin;\n      curMin = temp;\n    }\n    curMax = Math.max(n, curMax * n);\n    curMin = Math.min(n, curMin * n);\n    res = Math.max(res, curMax);\n  }\n  return res;\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(maxProduct(JSON.parse(lines[0])));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def maxProduct(self, nums: list[int]) -> int:\n        res = nums[0]\n        cur_max = cur_min = 1\n        for n in nums:\n            if n < 0: cur_max, cur_min = cur_min, cur_max\n            cur_max = max(n, cur_max * n)\n            cur_min = min(n, cur_min * n)\n            res = max(res, cur_max)\n        return res",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_106: ProblemSeed = {
  "title": "Word Break",
  "description": "Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of one or more dictionary words.\nNote that the same word in the dictionary may be reused multiple times in the segmentation.",
  "difficulty": "MEDIUM",
  "tags": [
    "Dynamic Programming",
    "Hash Table",
    "String",
    "Trie",
    "Memoization"
  ],
  "constraints": "1 <= s.length <= 300\n1 <= wordDict.length <= 1000\n1 <= wordDict[i].length <= 20\ns and wordDict[i] consist of only lowercase English letters.\nAll the strings of wordDict are unique.",
  "hints": "dp[i] is true if s[0..i] can be segmented.",
  "editorial": "Approach: DP array dp[i] where dp[i] is true if prefix s[0..i] is valid. For each j < i, if dp[j] && wordDict.has(s[j..i]), then dp[i] = true.\nTime Complexity: O(n^2 * k)\nSpace Complexity: O(n)",
  "testCases": [
    {
      "input": "\"leetcode\"\n[\"leet\",\"code\"]",
      "output": "true"
    },
    {
      "input": "\"applepenapple\"\n[\"apple\",\"pen\"]",
      "output": "true"
    },
    {
      "input": "\"catsandog\"\n[\"cats\",\"dog\",\"sand\",\"and\",\"cat\"]",
      "output": "false"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "s = \"leetcode\", wordDict = [\"leet\",\"code\"]",
      "output": "true",
      "explanation": "\"leetcode\" can be segmented as \"leet code\"."
    },
    "PYTHON": {
      "input": "s = \"leetcode\", wordDict = [\"leet\",\"code\"]",
      "output": "true",
      "explanation": "\"leetcode\" can be segmented as \"leet code\"."
    },
    "JAVA": {
      "input": "s = \"leetcode\", wordDict = [\"leet\",\"code\"]",
      "output": "true",
      "explanation": "\"leetcode\" can be segmented as \"leet code\"."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "function wordBreak(s, wordDict) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(wordBreak(JSON.parse(lines[0]), JSON.parse(lines[1])));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def wordBreak(self, s: str, wordDict: list[str]) -> bool:\n        pass",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function wordBreak(s, wordDict) {\n  const words = new Set(wordDict);\n  const dp = new Array(s.length + 1).fill(false);\n  dp[0] = true;\n  for (let i = 1; i <= s.length; i++) {\n    for (let j = 0; j < i; j++) {\n      if (dp[j] && words.has(s.substring(j, i))) {\n        dp[i] = true;\n        break;\n      }\n    }\n  }\n  return dp[s.length];\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(wordBreak(JSON.parse(lines[0]), JSON.parse(lines[1])));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def wordBreak(self, s: str, wordDict: list[str]) -> bool:\n        words = set(wordDict)\n        dp = [False] * (len(s) + 1)\n        dp[0] = True\n        for i in range(1, len(s) + 1):\n            for j in range(i):\n                if dp[j] and s[j:i] in words:\n                    dp[i] = True\n                    break\n        return dp[len(s)]",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_107: ProblemSeed = {
  "title": "Longest Increasing Subsequence",
  "description": "Given an integer array nums, return the length of the longest strictly increasing subsequence.",
  "difficulty": "MEDIUM",
  "tags": [
    "Dynamic Programming",
    "Array",
    "Binary Search"
  ],
  "constraints": "1 <= nums.length <= 2500\n-10^4 <= nums[i] <= 10^4",
  "hints": "Patience sorting / binary search to maintain smallest tails of increasing subsequences.",
  "editorial": "Approach: Binary search with tails array (patience sorting). For each num, binary search its insertion point in tails. Replace or append.\nTime Complexity: O(n log n)\nSpace Complexity: O(n)",
  "testCases": [
    {
      "input": "[10,9,2,5,3,7,101,18]",
      "output": "4"
    },
    {
      "input": "[0,1,0,3,2,3]",
      "output": "4"
    },
    {
      "input": "[7,7,7,7,7,7,7]",
      "output": "1"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "nums = [10,9,2,5,3,7,101,18]",
      "output": "4",
      "explanation": "The longest increasing subsequence is [2,3,7,101], therefore the length is 4."
    },
    "PYTHON": {
      "input": "nums = [10,9,2,5,3,7,101,18]",
      "output": "4",
      "explanation": "The longest increasing subsequence is [2,3,7,101], therefore the length is 4."
    },
    "JAVA": {
      "input": "nums = [10,9,2,5,3,7,101,18]",
      "output": "4",
      "explanation": "The longest increasing subsequence is [2,3,7,101], therefore the length is 4."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "function lengthOfLIS(nums) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(lengthOfLIS(JSON.parse(lines[0])));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def lengthOfLIS(self, nums: list[int]) -> int:\n        pass",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function lengthOfLIS(nums) {\n  const tails = [];\n  for (const x of nums) {\n    let l = 0, r = tails.length;\n    while (l < r) {\n      const m = Math.floor((l + r) / 2);\n      if (tails[m] < x) l = m + 1;\n      else r = m;\n    }\n    tails[l] = x;\n  }\n  return tails.length;\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(lengthOfLIS(JSON.parse(lines[0])));\n});",
    "PYTHON": "import sys, json, bisect\nclass Solution:\n    def lengthOfLIS(self, nums: list[int]) -> int:\n        tails = []\n        for x in nums:\n            i = bisect.bisect_left(tails, x)\n            if i == len(tails): tails.append(x)\n            else: tails[i] = x\n        return len(tails)",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_108: ProblemSeed = {
  "title": "Partition Equal Subset Sum",
  "description": "Given an integer array nums, return true if you can partition the array into two subsets such that the sum of the elements in both subsets is equal or false otherwise.",
  "difficulty": "MEDIUM",
  "tags": [
    "Dynamic Programming",
    "Array"
  ],
  "constraints": "1 <= nums.length <= 200\n1 <= nums[i] <= 100",
  "hints": "Reduce to 0/1 knapsack with target = sum(nums) / 2.",
  "editorial": "Approach: Total sum must be even. Target = sum / 2. Maintain a set or boolean DP of achievable subset sums.\nTime Complexity: O(n * target)\nSpace Complexity: O(target)",
  "testCases": [
    {
      "input": "[1,5,11,5]",
      "output": "true"
    },
    {
      "input": "[1,2,3,5]",
      "output": "false"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "nums = [1,5,11,5]",
      "output": "true",
      "explanation": "Can be partitioned as [1, 5, 5] and [11]."
    },
    "PYTHON": {
      "input": "nums = [1,5,11,5]",
      "output": "true",
      "explanation": "Can be partitioned as [1, 5, 5] and [11]."
    },
    "JAVA": {
      "input": "nums = [1,5,11,5]",
      "output": "true",
      "explanation": "Can be partitioned as [1, 5, 5] and [11]."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "function canPartition(nums) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(canPartition(JSON.parse(lines[0])));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def canPartition(self, nums: list[int]) -> bool:\n        pass",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function canPartition(nums) {\n  const total = nums.reduce((a, b) => a + b, 0);\n  if (total % 2 !== 0) return false;\n  const target = total / 2;\n  let dp = new Set([0]);\n  for (const n of nums) {\n    const next = new Set(dp);\n    for (const s of dp) {\n      if (s + n === target) return true;\n      if (s + n < target) next.add(s + n);\n    }\n    dp = next;\n  }\n  return dp.has(target);\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(canPartition(JSON.parse(lines[0])));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def canPartition(self, nums: list[int]) -> bool:\n        s = sum(nums)\n        if s % 2 != 0: return False\n        target = s // 2\n        dp = set([0])\n        for n in nums:\n            dp |= {t + n for t in dp if t + n <= target}\n            if target in dp: return True\n        return False",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_109: ProblemSeed = {
  "title": "Unique Paths",
  "description": "There is a robot on an m x n grid. The robot is initially located at the top-left corner (i.e., grid[0][0]). The robot tries to move to the bottom-right corner (i.e., grid[m - 1][n - 1]). The robot can only move either down or right at any point in time.\nGiven the two integers m and n, return the number of possible unique paths that the robot can take to reach the bottom-right corner.",
  "difficulty": "MEDIUM",
  "tags": [
    "Dynamic Programming",
    "Math",
    "Combinatorics"
  ],
  "constraints": "1 <= m, n <= 100",
  "hints": "dp[i][j] = dp[i-1][j] + dp[i][j-1].",
  "editorial": "Approach: 1D row DP. For each cell, paths = paths above + paths to the left. Alternatively, combinations C(m+n-2, m-1).\nTime Complexity: O(m * n)\nSpace Complexity: O(n)",
  "testCases": [
    {
      "input": "3\n7",
      "output": "28"
    },
    {
      "input": "3\n2",
      "output": "3"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "m = 3, n = 7",
      "output": "28",
      "explanation": "Total unique paths: 28."
    },
    "PYTHON": {
      "input": "m = 3, n = 7",
      "output": "28",
      "explanation": "Total unique paths: 28."
    },
    "JAVA": {
      "input": "m = 3, n = 7",
      "output": "28",
      "explanation": "Total unique paths: 28."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "function uniquePaths(m, n) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(uniquePaths(parseInt(lines[0], 10), parseInt(lines[1], 10)));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def uniquePaths(self, m: int, n: int) -> int:\n        pass",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function uniquePaths(m, n) {\n  const row = new Array(n).fill(1);\n  for (let i = 1; i < m; i++) {\n    for (let j = 1; j < n; j++) {\n      row[j] += row[j - 1];\n    }\n  }\n  return row[n - 1];\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(uniquePaths(parseInt(lines[0], 10), parseInt(lines[1], 10)));\n});",
    "PYTHON": "import sys, json, math\nclass Solution:\n    def uniquePaths(self, m: int, n: int) -> int:\n        return math.comb(m + n - 2, m - 1)",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_110: ProblemSeed = {
  "title": "Longest Common Subsequence",
  "description": "Given two strings text1 and text2, return the length of their longest common subsequence. If there is no common subsequence, return 0.\nA subsequence of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order of the remaining characters.\nA common subsequence of two strings is a subsequence that is common to both strings.",
  "difficulty": "MEDIUM",
  "tags": [
    "Dynamic Programming",
    "String"
  ],
  "constraints": "1 <= text1.length, text2.length <= 1000\ntext1 and text2 consist of only lowercase English characters.",
  "hints": "If text1[i] == text2[j], dp[i][j] = 1 + dp[i-1][j-1], else max(dp[i-1][j], dp[i][j-1]).",
  "editorial": "Approach: 2D DP grid. If characters match, add 1 to diagonal; else take maximum of top and left.\nTime Complexity: O(m * n)\nSpace Complexity: O(m * n) or O(min(m, n))",
  "testCases": [
    {
      "input": "\"abcde\"\n\"ace\"",
      "output": "3"
    },
    {
      "input": "\"abc\"\n\"abc\"",
      "output": "3"
    },
    {
      "input": "\"abc\"\n\"def\"",
      "output": "0"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "text1 = \"abcde\", text2 = \"ace\"",
      "output": "3",
      "explanation": "Longest common subsequence is \"ace\"."
    },
    "PYTHON": {
      "input": "text1 = \"abcde\", text2 = \"ace\"",
      "output": "3",
      "explanation": "Longest common subsequence is \"ace\"."
    },
    "JAVA": {
      "input": "text1 = \"abcde\", text2 = \"ace\"",
      "output": "3",
      "explanation": "Longest common subsequence is \"ace\"."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "function longestCommonSubsequence(text1, text2) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(longestCommonSubsequence(JSON.parse(lines[0]), JSON.parse(lines[1])));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def longestCommonSubsequence(self, text1: str, text2: str) -> int:\n        pass",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function longestCommonSubsequence(text1, text2) {\n  const m = text1.length, n = text2.length;\n  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));\n  for (let i = 1; i <= m; i++) {\n    for (let j = 1; j <= n; j++) {\n      if (text1[i - 1] === text2[j - 1]) dp[i][j] = dp[i - 1][j - 1] + 1;\n      else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);\n    }\n  }\n  return dp[m][n];\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(longestCommonSubsequence(JSON.parse(lines[0]), JSON.parse(lines[1])));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def longestCommonSubsequence(self, text1: str, text2: str) -> int:\n        m, n = len(text1), len(text2)\n        dp = [[0] * (n + 1) for _ in range(m + 1)]\n        for i in range(1, m + 1):\n            for j in range(1, n + 1):\n                if text1[i-1] == text2[j-1]: dp[i][j] = 1 + dp[i-1][j-1]\n                else: dp[i][j] = max(dp[i-1][j], dp[i][j-1])\n        return dp[m][n]",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_111: ProblemSeed = {
  "title": "Best Time to Buy and Sell Stock with Cooldown",
  "description": "You are given an array prices where prices[i] is the price of a given stock on the ith day.\nFind the maximum profit you can achieve. You may complete as many transactions as you like (i.e., buy one and sell one share of the stock multiple times) with the following restrictions:\n- After you sell your stock, you cannot buy stock on the next day (i.e., cooldown one day).\nNote: You may not engage in multiple transactions simultaneously (i.e., you must sell the stock before you buy again).",
  "difficulty": "MEDIUM",
  "tags": [
    "Dynamic Programming",
    "Array"
  ],
  "constraints": "1 <= prices.length <= 5000\n0 <= prices[i] <= 1000",
  "hints": "State machine DP: unheld, held, reset (cooldown).",
  "editorial": "Approach: Three states: held, sold, rest. held = max(held, rest - price), sold = held + price, rest = max(rest, prev_sold).\nTime Complexity: O(n)\nSpace Complexity: O(1)",
  "testCases": [
    {
      "input": "[1,2,3,0,2]",
      "output": "3"
    },
    {
      "input": "[1]",
      "output": "0"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "prices = [1,2,3,0,2]",
      "output": "3",
      "explanation": "transactions = [buy, sell, cooldown, buy, sell]"
    },
    "PYTHON": {
      "input": "prices = [1,2,3,0,2]",
      "output": "3",
      "explanation": "transactions = [buy, sell, cooldown, buy, sell]"
    },
    "JAVA": {
      "input": "prices = [1,2,3,0,2]",
      "output": "3",
      "explanation": "transactions = [buy, sell, cooldown, buy, sell]"
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "function maxProfit(prices) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(maxProfit(JSON.parse(lines[0])));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def maxProfit(self, prices: list[int]) -> int:\n        pass",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function maxProfit(prices) {\n  let sold = 0, rest = 0, held = -Infinity;\n  for (const p of prices) {\n    const prevSold = sold;\n    sold = held + p;\n    held = Math.max(held, rest - p);\n    rest = Math.max(rest, prevSold);\n  }\n  return Math.max(sold, rest);\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(maxProfit(JSON.parse(lines[0])));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def maxProfit(self, prices: list[int]) -> int:\n        sold, rest, held = 0, 0, float('-inf')\n        for p in prices:\n            prev_sold = sold\n            sold = held + p\n            held = max(held, rest - p)\n            rest = max(rest, prev_sold)\n        return max(sold, rest)",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_112: ProblemSeed = {
  "title": "Coin Change II",
  "description": "You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money.\nReturn the number of combinations that make up that amount. If that amount of money cannot be made up by any combination of the coins, return 0.\nYou may assume that you have an infinite number of each kind of coin.",
  "difficulty": "MEDIUM",
  "tags": [
    "Dynamic Programming",
    "Array"
  ],
  "constraints": "1 <= coins.length <= 300\n1 <= coins[i] <= 5000\nAll the values of coins are unique.\n0 <= amount <= 5000",
  "hints": "Unbounded knapsack: loop coins in the outer loop to count combinations, not permutations.",
  "editorial": "Approach: dp[i] is number of combinations for amount i. Loop coin in coins: for i from coin to amount: dp[i] += dp[i - coin].\nTime Complexity: O(amount * coins.length)\nSpace Complexity: O(amount)",
  "testCases": [
    {
      "input": "5\n[1,2,5]",
      "output": "4"
    },
    {
      "input": "3\n[2]",
      "output": "0"
    },
    {
      "input": "10\n[10]",
      "output": "1"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "amount = 5, coins = [1,2,5]",
      "output": "4",
      "explanation": "4 ways to make 5: 5, 2+2+1, 2+1+1+1, 1+1+1+1+1."
    },
    "PYTHON": {
      "input": "amount = 5, coins = [1,2,5]",
      "output": "4",
      "explanation": "4 ways to make 5: 5, 2+2+1, 2+1+1+1, 1+1+1+1+1."
    },
    "JAVA": {
      "input": "amount = 5, coins = [1,2,5]",
      "output": "4",
      "explanation": "4 ways to make 5: 5, 2+2+1, 2+1+1+1, 1+1+1+1+1."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "function change(amount, coins) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(change(parseInt(lines[0], 10), JSON.parse(lines[1])));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def change(self, amount: int, coins: list[int]) -> int:\n        pass",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function change(amount, coins) {\n  const dp = new Array(amount + 1).fill(0);\n  dp[0] = 1;\n  for (const c of coins) {\n    for (let i = c; i <= amount; i++) {\n      dp[i] += dp[i - c];\n    }\n  }\n  return dp[amount];\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(change(parseInt(lines[0], 10), JSON.parse(lines[1])));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def change(self, amount: int, coins: list[int]) -> int:\n        dp = [0] * (amount + 1)\n        dp[0] = 1\n        for c in coins:\n            for i in range(c, amount + 1):\n                dp[i] += dp[i - c]\n        return dp[amount]",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_113: ProblemSeed = {
  "title": "Target Sum",
  "description": "You are given an integer array nums and an integer target.\nYou want to build an expression out of nums by adding one of the symbols '+' and '-' before each integer in nums and then concatenate all the integers.\nReturn the number of different expressions that you can build, which evaluates to target.",
  "difficulty": "MEDIUM",
  "tags": [
    "Dynamic Programming",
    "Array",
    "Backtracking"
  ],
  "constraints": "1 <= nums.length <= 20\n0 <= nums[i] <= 1000\n0 <= sum(nums[i]) <= 1000\n-1000 <= target <= 1000",
  "hints": "P - N = target and P + N = sum => 2P = target + sum => P = (target + sum) / 2.",
  "editorial": "Approach: Transform into subset sum problem: find subsets summing to P = (sum + target) / 2. If (sum + target) is negative or odd, return 0.\nTime Complexity: O(n * P)\nSpace Complexity: O(P)",
  "testCases": [
    {
      "input": "[1,1,1,1,1]\n3",
      "output": "5"
    },
    {
      "input": "[1]\n1",
      "output": "1"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "nums = [1,1,1,1,1], target = 3",
      "output": "5",
      "explanation": "5 ways to assign signs."
    },
    "PYTHON": {
      "input": "nums = [1,1,1,1,1], target = 3",
      "output": "5",
      "explanation": "5 ways to assign signs."
    },
    "JAVA": {
      "input": "nums = [1,1,1,1,1], target = 3",
      "output": "5",
      "explanation": "5 ways to assign signs."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "function findTargetSumWays(nums, target) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(findTargetSumWays(JSON.parse(lines[0]), parseInt(lines[1], 10)));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def findTargetSumWays(self, nums: list[int], target: int) -> int:\n        pass",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function findTargetSumWays(nums, target) {\n  const total = nums.reduce((a, b) => a + b, 0);\n  if (total < Math.abs(target) || (total + target) % 2 !== 0) return 0;\n  const P = (total + target) / 2;\n  const dp = new Array(P + 1).fill(0);\n  dp[0] = 1;\n  for (const n of nums) {\n    for (let j = P; j >= n; j--) {\n      dp[j] += dp[j - n];\n    }\n  }\n  return dp[P];\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(findTargetSumWays(JSON.parse(lines[0]), parseInt(lines[1], 10)));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def findTargetSumWays(self, nums: list[int], target: int) -> int:\n        tot = sum(nums)\n        if tot < abs(target) or (tot + target) % 2 != 0: return 0\n        P = (tot + target) // 2\n        dp = [0] * (P + 1)\n        dp[0] = 1\n        for n in nums:\n            for j in range(P, n - 1, -1):\n                dp[j] += dp[j - n]\n        return dp[P]",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_114: ProblemSeed = {
  "title": "Interleaving String",
  "description": "Given strings s1, s2, and s3, find whether s3 is formed by an interleaving of s1 and s2.\nAn interleaving of two strings s and t is a configuration where s and t are divided into n and m substrings respectively, such that s = s1 + s2 + ... + sn, t = t1 + t2 + ... + tm, and the concatenation interweaves them.",
  "difficulty": "MEDIUM",
  "tags": [
    "Dynamic Programming",
    "String"
  ],
  "constraints": "0 <= s1.length, s2.length <= 100\n0 <= s3.length <= 200\ns1, s2, and s3 consist of lowercase English letters.",
  "hints": "dp[i][j] is true if s1[0..i] and s2[0..j] interleave into s3[0..i+j].",
  "editorial": "Approach: 2D DP grid. dp[i][j] = (dp[i-1][j] && s1[i-1] == s3[i+j-1]) || (dp[i][j-1] && s2[j-1] == s3[i+j-1]).\nTime Complexity: O(len(s1) * len(s2))\nSpace Complexity: O(len(s2))",
  "testCases": [
    {
      "input": "\"aabcc\"\n\"dbbca\"\n\"aadbbcbcac\"",
      "output": "true"
    },
    {
      "input": "\"aabcc\"\n\"dbbca\"\n\"aadbbbaccc\"",
      "output": "false"
    },
    {
      "input": "\"\"\n\"\"\n\"\"",
      "output": "true"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "s1 = \"aabcc\", s2 = \"dbbca\", s3 = \"aadbbcbcac\"",
      "output": "true",
      "explanation": "s3 is an interleaving of s1 and s2."
    },
    "PYTHON": {
      "input": "s1 = \"aabcc\", s2 = \"dbbca\", s3 = \"aadbbcbcac\"",
      "output": "true",
      "explanation": "s3 is an interleaving of s1 and s2."
    },
    "JAVA": {
      "input": "s1 = \"aabcc\", s2 = \"dbbca\", s3 = \"aadbbcbcac\"",
      "output": "true",
      "explanation": "s3 is an interleaving of s1 and s2."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "function isInterleave(s1, s2, s3) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(isInterleave(JSON.parse(lines[0]), JSON.parse(lines[1]), JSON.parse(lines[2])));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def isInterleave(self, s1: str, s2: str, s3: str) -> bool:\n        pass",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function isInterleave(s1, s2, s3) {\n  if (s1.length + s2.length !== s3.length) return false;\n  const m = s1.length, n = s2.length;\n  const dp = new Array(n + 1).fill(false);\n  dp[0] = true;\n  for (let j = 1; j <= n; j++) dp[j] = dp[j - 1] && s2[j - 1] === s3[j - 1];\n  for (let i = 1; i <= m; i++) {\n    dp[0] = dp[0] && s1[i - 1] === s3[i - 1];\n    for (let j = 1; j <= n; j++) {\n      dp[j] = (dp[j] && s1[i - 1] === s3[i + j - 1]) || (dp[j - 1] && s2[j - 1] === s3[i + j - 1]);\n    }\n  }\n  return dp[n];\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(isInterleave(JSON.parse(lines[0]), JSON.parse(lines[1]), JSON.parse(lines[2])));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def isInterleave(self, s1: str, s2: str, s3: str) -> bool:\n        if len(s1) + len(s2) != len(s3): return False\n        dp = [False] * (len(s2) + 1)\n        dp[0] = True\n        for j in range(1, len(s2) + 1): dp[j] = dp[j-1] and s2[j-1] == s3[j-1]\n        for i in range(1, len(s1) + 1):\n            dp[0] = dp[0] and s1[i-1] == s3[i-1]\n            for j in range(1, len(s2) + 1):\n                dp[j] = (dp[j] and s1[i-1] == s3[i+j-1]) or (dp[j-1] and s2[j-1] == s3[i+j-1])\n        return dp[len(s2)]",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_115: ProblemSeed = {
  "title": "Longest Increasing Path in a Matrix",
  "description": "Given an m x n integers matrix, return the length of the longest increasing path in matrix.\nFrom each cell, you can either move in four directions: left, right, up, or down. You may not move diagonally or move outside the boundary (i.e., wrap-around is not allowed).",
  "difficulty": "HARD",
  "tags": [
    "Dynamic Programming",
    "DFS",
    "BFS",
    "Graph",
    "Memoization",
    "Topological Sort"
  ],
  "constraints": "m == matrix.length\nn == matrix[i].length\n1 <= m, n <= 200\n0 <= matrix[i][j] <= 2^31 - 1",
  "hints": "Memoized DFS from each cell: memo[r][c] = 1 + max(dfs(neighbors)).",
  "editorial": "Approach: DFS with memoization. For each cell (r, c), compute 1 + max increasing path of strictly greater neighbors. Since it's strictly increasing, no cycles exist.\nTime Complexity: O(m * n)\nSpace Complexity: O(m * n)",
  "testCases": [
    {
      "input": "[[9,9,4],[6,6,8],[2,1,1]]",
      "output": "4"
    },
    {
      "input": "[[3,4,5],[3,2,6],[2,2,1]]",
      "output": "4"
    },
    {
      "input": "[[1]]",
      "output": "1"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "matrix = [[9,9,4],[6,6,8],[2,1,1]]",
      "output": "4",
      "explanation": "Longest path is [1, 2, 6, 9]."
    },
    "PYTHON": {
      "input": "matrix = [[9,9,4],[6,6,8],[2,1,1]]",
      "output": "4",
      "explanation": "Longest path is [1, 2, 6, 9]."
    },
    "JAVA": {
      "input": "matrix = [[9,9,4],[6,6,8],[2,1,1]]",
      "output": "4",
      "explanation": "Longest path is [1, 2, 6, 9]."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "function longestIncreasingPath(matrix) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(longestIncreasingPath(JSON.parse(lines[0])));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def longestIncreasingPath(self, matrix: list[list[int]]) -> int:\n        pass",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function longestIncreasingPath(matrix) {\n  const R = matrix.length, C = matrix[0].length;\n  const memo = Array.from({ length: R }, () => new Array(C).fill(0));\n  const dirs = [[-1,0],[1,0],[0,-1],[0,1]];\n  function dfs(r, c) {\n    if (memo[r][c] !== 0) return memo[r][c];\n    let maxLen = 1;\n    for (const [dr, dc] of dirs) {\n      const nr = r + dr, nc = c + dc;\n      if (nr >= 0 && nr < R && nc >= 0 && nc < C && matrix[nr][nc] > matrix[r][c]) {\n        maxLen = Math.max(maxLen, 1 + dfs(nr, nc));\n      }\n    }\n    return memo[r][c] = maxLen;\n  }\n  let ans = 0;\n  for (let r = 0; r < R; r++) {\n    for (let c = 0; c < C; c++) {\n      ans = Math.max(ans, dfs(r, c));\n    }\n  }\n  return ans;\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(longestIncreasingPath(JSON.parse(lines[0])));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def longestIncreasingPath(self, matrix: list[list[int]]) -> int:\n        R, C = len(matrix), len(matrix[0])\n        memo = {}\n        def dfs(r, c):\n            if (r, c) in memo: return memo[(r, c)]\n            res = 1\n            for dr, dc in [(-1,0),(1,0),(0,-1),(0,1)]:\n                nr, nc = r + dr, c + dc\n                if 0 <= nr < R and 0 <= nc < C and matrix[nr][nc] > matrix[r][c]:\n                    res = max(res, 1 + dfs(nr, nc))\n            memo[(r, c)] = res\n            return res\n        return max(dfs(r, c) for r in range(R) for c in range(C))",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_116: ProblemSeed = {
  "title": "Distinct Subsequences",
  "description": "Given two strings s and t, return the number of distinct subsequences of s which equals t.\nThe test cases are generated so that the answer fits on a 32-bit signed integer.",
  "difficulty": "HARD",
  "tags": [
    "Dynamic Programming",
    "String"
  ],
  "constraints": "1 <= s.length, t.length <= 1000\ns and t consist of English letters.",
  "hints": "dp[i][j] is number of distinct subsequences of s[0..i] matching t[0..j].",
  "editorial": "Approach: 2D DP table. If s[i-1] == t[j-1], dp[i][j] = dp[i-1][j-1] + dp[i-1][j]; else dp[i][j] = dp[i-1][j].\nTime Complexity: O(m * n)\nSpace Complexity: O(n)",
  "testCases": [
    {
      "input": "\"rabbbit\"\n\"rabbit\"",
      "output": "3"
    },
    {
      "input": "\"babgbag\"\n\"bag\"",
      "output": "5"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "s = \"rabbbit\", t = \"rabbit\"",
      "output": "3",
      "explanation": "3 ways to generate 'rabbit'."
    },
    "PYTHON": {
      "input": "s = \"rabbbit\", t = \"rabbit\"",
      "output": "3",
      "explanation": "3 ways to generate 'rabbit'."
    },
    "JAVA": {
      "input": "s = \"rabbbit\", t = \"rabbit\"",
      "output": "3",
      "explanation": "3 ways to generate 'rabbit'."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "function numDistinct(s, t) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(numDistinct(JSON.parse(lines[0]), JSON.parse(lines[1])));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def numDistinct(self, s: str, t: str) -> int:\n        pass",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function numDistinct(s, t) {\n  const m = s.length, n = t.length;\n  const dp = new Array(n + 1).fill(0);\n  dp[0] = 1;\n  for (let i = 1; i <= m; i++) {\n    for (let j = n; j >= 1; j--) {\n      if (s[i - 1] === t[j - 1]) dp[j] += dp[j - 1];\n    }\n  }\n  return dp[n];\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(numDistinct(JSON.parse(lines[0]), JSON.parse(lines[1])));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def numDistinct(self, s: str, t: str) -> int:\n        m, n = len(s), len(t)\n        dp = [0] * (n + 1)\n        dp[0] = 1\n        for i in range(1, m + 1):\n            for j in range(n, 0, -1):\n                if s[i-1] == t[j-1]: dp[j] += dp[j-1]\n        return dp[n]",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_117: ProblemSeed = {
  "title": "Edit Distance",
  "description": "Given two strings word1 and word2, return the minimum number of operations required to convert word1 to word2.\nYou have the following three operations permitted on a word:\n- Insert a character\n- Delete a character\n- Replace a character",
  "difficulty": "HARD",
  "tags": [
    "Dynamic Programming",
    "String"
  ],
  "constraints": "0 <= word1.length, word2.length <= 500\nword1 and word2 consist of lowercase English letters.",
  "hints": "Classic Levenshtein distance DP.",
  "editorial": "Approach: dp[i][j] is min operations to convert word1[0..i] to word2[0..j]. If word1[i-1] == word2[j-1], cost is dp[i-1][j-1]; else 1 + min(insert dp[i][j-1], delete dp[i-1][j], replace dp[i-1][j-1]).\nTime Complexity: O(m * n)\nSpace Complexity: O(n)",
  "testCases": [
    {
      "input": "\"horse\"\n\"ros\"",
      "output": "3"
    },
    {
      "input": "\"intention\"\n\"execution\"",
      "output": "5"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "word1 = \"horse\", word2 = \"ros\"",
      "output": "3",
      "explanation": "horse -> rorse -> rose -> ros (3 steps)."
    },
    "PYTHON": {
      "input": "word1 = \"horse\", word2 = \"ros\"",
      "output": "3",
      "explanation": "horse -> rorse -> rose -> ros (3 steps)."
    },
    "JAVA": {
      "input": "word1 = \"horse\", word2 = \"ros\"",
      "output": "3",
      "explanation": "horse -> rorse -> rose -> ros (3 steps)."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "function minDistance(word1, word2) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(minDistance(JSON.parse(lines[0]), JSON.parse(lines[1])));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def minDistance(self, word1: str, word2: str) -> int:\n        pass",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function minDistance(word1, word2) {\n  const m = word1.length, n = word2.length;\n  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));\n  for (let i = 0; i <= m; i++) dp[i][0] = i;\n  for (let j = 0; j <= n; j++) dp[0][j] = j;\n  for (let i = 1; i <= m; i++) {\n    for (let j = 1; j <= n; j++) {\n      if (word1[i - 1] === word2[j - 1]) dp[i][j] = dp[i - 1][j - 1];\n      else dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);\n    }\n  }\n  return dp[m][n];\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(minDistance(JSON.parse(lines[0]), JSON.parse(lines[1])));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def minDistance(self, word1: str, word2: str) -> int:\n        m, n = len(word1), len(word2)\n        dp = [[0] * (n + 1) for _ in range(m + 1)]\n        for i in range(m + 1): dp[i][0] = i\n        for j in range(n + 1): dp[0][j] = j\n        for i in range(1, m + 1):\n            for j in range(1, n + 1):\n                if word1[i-1] == word2[j-1]: dp[i][j] = dp[i-1][j-1]\n                else: dp[i][j] = 1 + min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1])\n        return dp[m][n]",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_118: ProblemSeed = {
  "title": "Burst Balloons",
  "description": "You are given n balloons, indexed from 0 to n - 1. Each balloon is painted with a number on it represented by an array nums. You are asked to burst all the balloons.\nIf you burst the ith balloon, you will get nums[i - 1] * nums[i] * nums[i + 1] coins. If i - 1 or i + 1 goes out of bounds of the array, then treat it as if there is a balloon with a 1 painted on it.\nReturn the maximum coins you can collect by bursting the balloons wisely.",
  "difficulty": "HARD",
  "tags": [
    "Dynamic Programming",
    "Array"
  ],
  "constraints": "n == nums.length\n1 <= n <= 300\n0 <= nums[i] <= 100",
  "hints": "Think backwards: which balloon is burst LAST in range (l, r)?",
  "editorial": "Approach: Interval DP. Pad nums with 1 on left and right. Consider which balloon k is burst LAST in subarray (l, r). dp[l][r] = max over k of (nums[l]*nums[k]*nums[r] + dp[l][k] + dp[k][r]).\nTime Complexity: O(n^3)\nSpace Complexity: O(n^2)",
  "testCases": [
    {
      "input": "[3,1,5,8]",
      "output": "167"
    },
    {
      "input": "[1,5]",
      "output": "10"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "nums = [3,1,5,8]",
      "output": "167",
      "explanation": "Coins = 3*1*5 + 3*5*8 + 1*3*8 + 1*8*1 = 167."
    },
    "PYTHON": {
      "input": "nums = [3,1,5,8]",
      "output": "167",
      "explanation": "Coins = 3*1*5 + 3*5*8 + 1*3*8 + 1*8*1 = 167."
    },
    "JAVA": {
      "input": "nums = [3,1,5,8]",
      "output": "167",
      "explanation": "Coins = 3*1*5 + 3*5*8 + 1*3*8 + 1*8*1 = 167."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "function maxCoins(nums) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(maxCoins(JSON.parse(lines[0])));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def maxCoins(self, nums: list[int]) -> int:\n        pass",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function maxCoins(nums) {\n  const A = [1, ...nums, 1];\n  const n = A.length;\n  const dp = Array.from({ length: n }, () => new Array(n).fill(0));\n  for (let len = 2; len < n; len++) {\n    for (let l = 0; l < n - len; l++) {\n      const r = l + len;\n      for (let k = l + 1; k < r; k++) {\n        dp[l][r] = Math.max(dp[l][r], A[l] * A[k] * A[r] + dp[l][k] + dp[k][r]);\n      }\n    }\n  }\n  return dp[0][n - 1];\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(maxCoins(JSON.parse(lines[0])));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def maxCoins(self, nums: list[int]) -> int:\n        A = [1] + nums + [1]\n        n = len(A)\n        dp = [[0] * n for _ in range(n)]\n        for length in range(2, n):\n            for l in range(n - length):\n                r = l + length\n                for k in range(l + 1, r):\n                    dp[l][r] = max(dp[l][r], A[l] * A[k] * A[r] + dp[l][k] + dp[k][r])\n        return dp[0][n - 1]",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_119: ProblemSeed = {
  "title": "Regular Expression Matching",
  "description": "Given an input string s and a pattern p, implement regular expression matching with support for '.' and '*' where:\n- '.' Matches any single character.\n- '*' Matches zero or more of the preceding element.\nThe matching should cover the entire input string (not partial).",
  "difficulty": "HARD",
  "tags": [
    "Dynamic Programming",
    "String",
    "Recursion"
  ],
  "constraints": "1 <= s.length <= 20\n1 <= p.length <= 20\ns contains only lowercase English letters.\np contains only lowercase English letters, '.', and '*'.\nIt is guaranteed for each appearance of the character '*', there will be a previous valid character to match.",
  "hints": "dp[i][j] is true if s[i..] matches p[j..]. Handle '*' matching zero or more characters.",
  "editorial": "Approach: 2D DP. dp[i][j] indicates whether s[i..] matches p[j..]. If next char is '*', either skip pattern (j + 2) or use char if it matches s[i] and continue on s[i+1].\nTime Complexity: O(m * n)\nSpace Complexity: O(m * n)",
  "testCases": [
    {
      "input": "\"aa\"\n\"a\"",
      "output": "false"
    },
    {
      "input": "\"aa\"\n\"a*\"",
      "output": "true"
    },
    {
      "input": "\"ab\"\n\".*\"",
      "output": "true"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "s = \"aa\", p = \"a*\"",
      "output": "true",
      "explanation": "'*' means zero or more of the preceding element 'a'."
    },
    "PYTHON": {
      "input": "s = \"aa\", p = \"a*\"",
      "output": "true",
      "explanation": "'*' means zero or more of the preceding element 'a'."
    },
    "JAVA": {
      "input": "s = \"aa\", p = \"a*\"",
      "output": "true",
      "explanation": "'*' means zero or more of the preceding element 'a'."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "function isMatch(s, p) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(isMatch(JSON.parse(lines[0]), JSON.parse(lines[1])));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def isMatch(self, s: str, p: str) -> bool:\n        pass",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function isMatch(s, p) {\n  const m = s.length, n = p.length;\n  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(false));\n  dp[m][n] = true;\n  for (let i = m; i >= 0; i--) {\n    for (let j = n - 1; j >= 0; j--) {\n      const firstMatch = i < m && (s[i] === p[j] || p[j] === '.');\n      if (j + 1 < n && p[j + 1] === '*') {\n        dp[i][j] = dp[i][j + 2] || (firstMatch && dp[i + 1][j]);\n      } else {\n        dp[i][j] = firstMatch && dp[i + 1][j + 1];\n      }\n    }\n  }\n  return dp[0][0];\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(isMatch(JSON.parse(lines[0]), JSON.parse(lines[1])));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def isMatch(self, s: str, p: str) -> bool:\n        memo = {}\n        def dp(i, j):\n            if (i, j) in memo: return memo[(i, j)]\n            if j == len(p): return i == len(s)\n            first = i < len(s) and (s[i] == p[j] or p[j] == '.')\n            if j + 1 < len(p) and p[j+1] == '*':\n                ans = dp(i, j + 2) or (first and dp(i + 1, j))\n            else:\n                ans = first and dp(i + 1, j + 1)\n            memo[(i, j)] = ans\n            return ans\n        return dp(0, 0)",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_120: ProblemSeed = {
  "title": "Maximum Subarray",
  "description": "Given an integer array nums, find the subarray with the largest sum, and return its sum.",
  "difficulty": "MEDIUM",
  "tags": [
    "Greedy",
    "Array",
    "Divide and Conquer",
    "Dynamic Programming"
  ],
  "constraints": "1 <= nums.length <= 10^5\n-10^4 <= nums[i] <= 10^4",
  "hints": "Kadane's Algorithm: curSum = max(num, curSum + num).",
  "editorial": "Approach: Kadane's algorithm. Track running sum; if running sum becomes negative, reset it to 0.\nTime Complexity: O(n)\nSpace Complexity: O(1)",
  "testCases": [
    {
      "input": "[-2,1,-3,4,-1,2,1,-5,4]",
      "output": "6"
    },
    {
      "input": "[1]",
      "output": "1"
    },
    {
      "input": "[5,4,-1,7,8]",
      "output": "23"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "nums = [-2,1,-3,4,-1,2,1,-5,4]",
      "output": "6",
      "explanation": "Subarray [4,-1,2,1] has the largest sum 6."
    },
    "PYTHON": {
      "input": "nums = [-2,1,-3,4,-1,2,1,-5,4]",
      "output": "6",
      "explanation": "Subarray [4,-1,2,1] has the largest sum 6."
    },
    "JAVA": {
      "input": "nums = [-2,1,-3,4,-1,2,1,-5,4]",
      "output": "6",
      "explanation": "Subarray [4,-1,2,1] has the largest sum 6."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "function maxSubArray(nums) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(maxSubArray(JSON.parse(lines[0])));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def maxSubArray(self, nums: list[int]) -> int:\n        pass",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function maxSubArray(nums) {\n  let maxSum = nums[0], curSum = 0;\n  for (const n of nums) {\n    if (curSum < 0) curSum = 0;\n    curSum += n;\n    maxSum = Math.max(maxSum, curSum);\n  }\n  return maxSum;\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(maxSubArray(JSON.parse(lines[0])));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def maxSubArray(self, nums: list[int]) -> int:\n        max_sum = nums[0]\n        cur = 0\n        for n in nums:\n            cur = max(n, cur + n)\n            max_sum = max(max_sum, cur)\n        return max_sum",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_121: ProblemSeed = {
  "title": "Jump Game",
  "description": "You are given an integer array nums. You are initially positioned at the array's first index, and each element in the array represents your maximum jump length at that position.\nReturn true if you can reach the last index, or false otherwise.",
  "difficulty": "MEDIUM",
  "tags": [
    "Greedy",
    "Array",
    "Dynamic Programming"
  ],
  "constraints": "1 <= nums.length <= 10^4\n0 <= nums[i] <= 10^5",
  "hints": "Track furthest reachable index so far.",
  "editorial": "Approach: Greedy. Maintain maxReach. For each index i <= maxReach, maxReach = max(maxReach, i + nums[i]). If maxReach >= n - 1 return true.\nTime Complexity: O(n)\nSpace Complexity: O(1)",
  "testCases": [
    {
      "input": "[2,3,1,1,4]",
      "output": "true"
    },
    {
      "input": "[3,2,1,0,4]",
      "output": "false"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "nums = [2,3,1,1,4]",
      "output": "true",
      "explanation": "Jump 1 step from index 0 to 1, then 3 steps to last index."
    },
    "PYTHON": {
      "input": "nums = [2,3,1,1,4]",
      "output": "true",
      "explanation": "Jump 1 step from index 0 to 1, then 3 steps to last index."
    },
    "JAVA": {
      "input": "nums = [2,3,1,1,4]",
      "output": "true",
      "explanation": "Jump 1 step from index 0 to 1, then 3 steps to last index."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "function canJump(nums) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(canJump(JSON.parse(lines[0])));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def canJump(self, nums: list[int]) -> bool:\n        pass",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function canJump(nums) {\n  let maxReach = 0;\n  for (let i = 0; i < nums.length; i++) {\n    if (i > maxReach) return false;\n    maxReach = Math.max(maxReach, i + nums[i]);\n  }\n  return true;\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(canJump(JSON.parse(lines[0])));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def canJump(self, nums: list[int]) -> bool:\n        max_reach = 0\n        for i, x in enumerate(nums):\n            if i > max_reach: return False\n            max_reach = max(max_reach, i + x)\n        return True",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_122: ProblemSeed = {
  "title": "Jump Game II",
  "description": "You are given a 0-indexed array of integers nums of length n. You are initially positioned at nums[0].\nEach element nums[i] represents the maximum length of a forward jump from index i. In other words, if you are at nums[i], you can jump to any nums[i + j] where:\n- 0 <= j <= nums[i] and\n- i + j < n\nReturn the minimum number of jumps to reach nums[n - 1]. The test cases are generated such that you can reach nums[n - 1].",
  "difficulty": "MEDIUM",
  "tags": [
    "Greedy",
    "Array",
    "Dynamic Programming"
  ],
  "constraints": "1 <= nums.length <= 10^4\n0 <= nums[i] <= 1000\nIt's guaranteed that you can reach nums[n - 1].",
  "hints": "BFS level-by-level greedy approach using [left, right] window.",
  "editorial": "Approach: Greedy BFS. Maintain window [curEnd, curFarthest]. When i reaches curEnd, increment jumps and update curEnd to curFarthest.\nTime Complexity: O(n)\nSpace Complexity: O(1)",
  "testCases": [
    {
      "input": "[2,3,1,1,4]",
      "output": "2"
    },
    {
      "input": "[2,3,0,1,4]",
      "output": "2"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "nums = [2,3,1,1,4]",
      "output": "2",
      "explanation": "Min jumps is 2 (index 0 -> 1 -> 4)."
    },
    "PYTHON": {
      "input": "nums = [2,3,1,1,4]",
      "output": "2",
      "explanation": "Min jumps is 2 (index 0 -> 1 -> 4)."
    },
    "JAVA": {
      "input": "nums = [2,3,1,1,4]",
      "output": "2",
      "explanation": "Min jumps is 2 (index 0 -> 1 -> 4)."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "function jump(nums) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(jump(JSON.parse(lines[0])));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def jump(self, nums: list[int]) -> int:\n        pass",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function jump(nums) {\n  let jumps = 0, curEnd = 0, curFarthest = 0;\n  for (let i = 0; i < nums.length - 1; i++) {\n    curFarthest = Math.max(curFarthest, i + nums[i]);\n    if (i === curEnd) {\n      jumps++;\n      curEnd = curFarthest;\n    }\n  }\n  return jumps;\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(jump(JSON.parse(lines[0])));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def jump(self, nums: list[int]) -> int:\n        jumps = cur_end = cur_farthest = 0\n        for i in range(len(nums) - 1):\n            cur_farthest = max(cur_farthest, i + nums[i])\n            if i == cur_end:\n                jumps += 1\n                cur_end = cur_farthest\n        return jumps",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_123: ProblemSeed = {
  "title": "Gas Station",
  "description": "There are n gas stations along a circular route, where the amount of gas at the ith station is gas[i].\nYou have a car with an unlimited gas tank and it costs cost[i] of gas to travel from the ith station to its next (i + 1)th station. You begin the journey with an empty tank at one of the gas stations.\nGiven two integer arrays gas and cost, return the starting gas station's index if you can travel around the circuit once in the clockwise direction, otherwise return -1. If there exists a solution, it is guaranteed to be unique.",
  "difficulty": "MEDIUM",
  "tags": [
    "Greedy",
    "Array"
  ],
  "constraints": "n == gas.length == cost.length\n1 <= n <= 10^5\n0 <= gas[i], cost[i] <= 10^4",
  "hints": "If sum(gas) < sum(cost), impossible. Otherwise, whenever tank drops below 0, start must be at next station.",
  "editorial": "Approach: Check total gas >= total cost. If so, a unique solution exists. Iterate through stations maintaining curGas; if curGas < 0, reset curGas to 0 and set candidate start = i + 1.\nTime Complexity: O(n)\nSpace Complexity: O(1)",
  "testCases": [
    {
      "input": "[1,2,3,4,5]\n[3,4,5,1,2]",
      "output": "3"
    },
    {
      "input": "[2,3,4]\n[3,4,3]",
      "output": "-1"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "gas = [1,2,3,4,5], cost = [3,4,5,1,2]",
      "output": "3",
      "explanation": "Start at station 3 (index 3) and complete full circuit."
    },
    "PYTHON": {
      "input": "gas = [1,2,3,4,5], cost = [3,4,5,1,2]",
      "output": "3",
      "explanation": "Start at station 3 (index 3) and complete full circuit."
    },
    "JAVA": {
      "input": "gas = [1,2,3,4,5], cost = [3,4,5,1,2]",
      "output": "3",
      "explanation": "Start at station 3 (index 3) and complete full circuit."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "function canCompleteCircuit(gas, cost) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(canCompleteCircuit(JSON.parse(lines[0]), JSON.parse(lines[1])));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def canCompleteCircuit(self, gas: list[int], cost: list[int]) -> int:\n        pass",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function canCompleteCircuit(gas, cost) {\n  let totalGas = 0, totalCost = 0;\n  let cur = 0, start = 0;\n  for (let i = 0; i < gas.length; i++) {\n    totalGas += gas[i];\n    totalCost += cost[i];\n    cur += gas[i] - cost[i];\n    if (cur < 0) {\n      start = i + 1;\n      cur = 0;\n    }\n  }\n  return totalGas >= totalCost ? start : -1;\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(canCompleteCircuit(JSON.parse(lines[0]), JSON.parse(lines[1])));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def canCompleteCircuit(self, gas: list[int], cost: list[int]) -> int:\n        if sum(gas) < sum(cost): return -1\n        start = cur = 0\n        for i in range(len(gas)):\n            cur += gas[i] - cost[i]\n            if cur < 0:\n                start = i + 1\n                cur = 0\n        return start",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_124: ProblemSeed = {
  "title": "Hand of Straights",
  "description": "Alice has some number of cards and she wants to rearrange the cards into groups so that each group is of size groupSize, and consists of groupSize consecutive cards.\nGiven an integer array hand where hand[i] is the value written on the ith card and an integer groupSize, return true if she can rearrange the cards, or false otherwise.",
  "difficulty": "MEDIUM",
  "tags": [
    "Greedy",
    "Array",
    "Hash Table",
    "Sorting"
  ],
  "constraints": "1 <= hand.length <= 10^4\n0 <= hand[i] <= 10^9\n1 <= groupSize <= hand.length",
  "hints": "Sort unique cards and greedily form consecutive groups starting from the smallest available card.",
  "editorial": "Approach: Count card frequencies. For each smallest card with count > 0, verify the next groupSize - 1 consecutive cards are available with at least that count.\nTime Complexity: O(n log n)\nSpace Complexity: O(n)",
  "testCases": [
    {
      "input": "[1,2,3,6,2,3,4,7,8]\n3",
      "output": "true"
    },
    {
      "input": "[1,2,3,4,5]\n4",
      "output": "false"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "hand = [1,2,3,6,2,3,4,7,8], groupSize = 3",
      "output": "true",
      "explanation": "Arranged as [1,2,3], [2,3,4], [6,7,8]."
    },
    "PYTHON": {
      "input": "hand = [1,2,3,6,2,3,4,7,8], groupSize = 3",
      "output": "true",
      "explanation": "Arranged as [1,2,3], [2,3,4], [6,7,8]."
    },
    "JAVA": {
      "input": "hand = [1,2,3,6,2,3,4,7,8], groupSize = 3",
      "output": "true",
      "explanation": "Arranged as [1,2,3], [2,3,4], [6,7,8]."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "function isNStraightHand(hand, groupSize) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(isNStraightHand(JSON.parse(lines[0]), parseInt(lines[1], 10)));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def isNStraightHand(self, hand: list[int], groupSize: int) -> bool:\n        pass",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function isNStraightHand(hand, groupSize) {\n  if (hand.length % groupSize !== 0) return false;\n  const count = new Map();\n  for (const card of hand) count.set(card, (count.get(card) || 0) + 1);\n  const sortedCards = Array.from(count.keys()).sort((a, b) => a - b);\n  for (const card of sortedCards) {\n    const cnt = count.get(card);\n    if (cnt > 0) {\n      for (let i = 0; i < groupSize; i++) {\n        const nextCard = card + i;\n        if ((count.get(nextCard) || 0) < cnt) return false;\n        count.set(nextCard, count.get(nextCard) - cnt);\n      }\n    }\n  }\n  return true;\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(isNStraightHand(JSON.parse(lines[0]), parseInt(lines[1], 10)));\n});",
    "PYTHON": "import sys, json\nfrom collections import Counter\nclass Solution:\n    def isNStraightHand(self, hand: list[int], groupSize: int) -> bool:\n        if len(hand) % groupSize != 0: return False\n        counts = Counter(hand)\n        for card in sorted(counts):\n            if counts[card] > 0:\n                needed = counts[card]\n                for i in range(groupSize):\n                    if counts[card + i] < needed: return False\n                    counts[card + i] -= needed\n        return True",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_125: ProblemSeed = {
  "title": "Merge Triplets to Form Target Triplet",
  "description": "A triplet is an array of three integers. You are given a 2D integer array triplets, where triplets[i] = [ai, bi, ci] describes the ith triplet. You are also given an integer array target = [x, y, z] that describes the triplet you want to obtain.\nTo obtain target, you may apply the following operation on triplets any number of times (possibly zero times):\n- Choose two indices (0-indexed) i and j (i != j) and update triplets[j] to become [max(ai, aj), max(bi, bj), max(ci, cj)].\nReturn true if it is possible to obtain the target triplet [x, y, z] as an element of triplets, or false otherwise.",
  "difficulty": "MEDIUM",
  "tags": [
    "Greedy",
    "Array"
  ],
  "constraints": "1 <= triplets.length <= 10^5\ntriplets[i].length == target.length == 3\n1 <= ai, bi, ci, x, y, z <= 1000",
  "hints": "Discard any triplet where any value exceeds target. Among the valid ones, check if we can match each target element.",
  "editorial": "Approach: Filter out triplets where any element > target. From the remaining valid triplets, track if target[0], target[1], and target[2] each appear at least once.\nTime Complexity: O(n)\nSpace Complexity: O(1)",
  "testCases": [
    {
      "input": "[[2,5,3],[1,8,4],[1,7,5]]\n[2,7,5]",
      "output": "true"
    },
    {
      "input": "[[3,4,5],[4,5,6]]\n[3,2,5]",
      "output": "false"
    },
    {
      "input": "[[2,5,3],[2,3,4],[1,2,5],[5,2,3]]\n[5,5,5]",
      "output": "true"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "triplets = [[2,5,3],[1,8,4],[1,7,5]], target = [2,7,5]",
      "output": "true",
      "explanation": "Merge [2,5,3] and [1,7,5] gives [2,7,5]."
    },
    "PYTHON": {
      "input": "triplets = [[2,5,3],[1,8,4],[1,7,5]], target = [2,7,5]",
      "output": "true",
      "explanation": "Merge [2,5,3] and [1,7,5] gives [2,7,5]."
    },
    "JAVA": {
      "input": "triplets = [[2,5,3],[1,8,4],[1,7,5]], target = [2,7,5]",
      "output": "true",
      "explanation": "Merge [2,5,3] and [1,7,5] gives [2,7,5]."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "function mergeTriplets(triplets, target) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(mergeTriplets(JSON.parse(lines[0]), JSON.parse(lines[1])));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def mergeTriplets(self, triplets: list[list[int]], target: list[int]) -> bool:\n        pass",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function mergeTriplets(triplets, target) {\n  let matched0 = false, matched1 = false, matched2 = false;\n  for (const [a, b, c] of triplets) {\n    if (a <= target[0] && b <= target[1] && c <= target[2]) {\n      if (a === target[0]) matched0 = true;\n      if (b === target[1]) matched1 = true;\n      if (c === target[2]) matched2 = true;\n    }\n  }\n  return matched0 && matched1 && matched2;\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(mergeTriplets(JSON.parse(lines[0]), JSON.parse(lines[1])));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def mergeTriplets(self, triplets: list[list[int]], target: list[int]) -> bool:\n        m0 = m1 = m2 = False\n        for a, b, c in triplets:\n            if a <= target[0] and b <= target[1] and c <= target[2]:\n                if a == target[0]: m0 = True\n                if b == target[1]: m1 = True\n                if c == target[2]: m2 = True\n        return m0 and m1 and m2",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_126: ProblemSeed = {
  "title": "Partition Labels",
  "description": "You are given a string s. We want to partition the string into as many parts as possible so that each letter appears in at most one part.\nNote that the partition is done so that after concatenating all the parts in order, the resultant string should be s.\nReturn a list of integers representing the size of these parts.",
  "difficulty": "MEDIUM",
  "tags": [
    "Greedy",
    "Two Pointers",
    "String",
    "Hash Table"
  ],
  "constraints": "1 <= s.length <= 500\ns consists of lowercase English letters.",
  "hints": "Record the last occurrence of each character. Extend the current segment end to the furthest last occurrence.",
  "editorial": "Approach: Record last index of each character. Loop through s, extending end = max(end, last[s[i]]). When i === end, complete a partition.\nTime Complexity: O(n)\nSpace Complexity: O(1) (26 characters)",
  "testCases": [
    {
      "input": "\"ababcbacadefegdehijhklij\"",
      "output": "[9,7,8]"
    },
    {
      "input": "\"eccbbbbdec\"",
      "output": "[10]"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "s = \"ababcbacadefegdehijhklij\"",
      "output": "[9,7,8]",
      "explanation": "The partition is 'ababcbaca', 'defegde', 'hijhklij'."
    },
    "PYTHON": {
      "input": "s = \"ababcbacadefegdehijhklij\"",
      "output": "[9,7,8]",
      "explanation": "The partition is 'ababcbaca', 'defegde', 'hijhklij'."
    },
    "JAVA": {
      "input": "s = \"ababcbacadefegdehijhklij\"",
      "output": "[9,7,8]",
      "explanation": "The partition is 'ababcbaca', 'defegde', 'hijhklij'."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "function partitionLabels(s) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(JSON.stringify(partitionLabels(JSON.parse(lines[0]))));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def partitionLabels(self, s: str) -> list[int]:\n        pass",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function partitionLabels(s) {\n  const last = {};\n  for (let i = 0; i < s.length; i++) last[s[i]] = i;\n  const res = [];\n  let start = 0, end = 0;\n  for (let i = 0; i < s.length; i++) {\n    end = Math.max(end, last[s[i]]);\n    if (i === end) {\n      res.push(end - start + 1);\n      start = i + 1;\n    }\n  }\n  return res;\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(JSON.stringify(partitionLabels(JSON.parse(lines[0]))));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def partitionLabels(self, s: str) -> list[int]:\n        last = {c: i for i, c in enumerate(s)}\n        res = []\n        start = end = 0\n        for i, c in enumerate(s):\n            end = max(end, last[c])\n            if i == end:\n                res.append(end - start + 1)\n                start = i + 1\n        return res",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_127: ProblemSeed = {
  "title": "Valid Parenthesis String",
  "description": "Given a string s containing only three types of characters: '(', ')' and '*', return true if s is valid.\nThe following rules define a valid string:\n- Any left parenthesis '(' must have a corresponding right parenthesis ')'.\n- Any right parenthesis ')' must have a corresponding left parenthesis '('.\n- Left parenthesis '(' must go before the corresponding right parenthesis ')'.\n- '*' could be treated as a single right parenthesis ')' or a single left parenthesis '(' or an empty string \"\".",
  "difficulty": "MEDIUM",
  "tags": [
    "Greedy",
    "String",
    "Dynamic Programming",
    "Stack"
  ],
  "constraints": "1 <= s.length <= 100\ns[i] is '(', ')' or '*'.",
  "hints": "Track range [cmin, cmax] of possible open parentheses count.",
  "editorial": "Approach: Greedy range. Track minimum (cmin) and maximum (cmax) possible number of unmatched '('s. If cmax < 0, false. At the end, cmin === 0 means valid.\nTime Complexity: O(n)\nSpace Complexity: O(1)",
  "testCases": [
    {
      "input": "\"()\"",
      "output": "true"
    },
    {
      "input": "\"(*)\"",
      "output": "true"
    },
    {
      "input": "\"(*))\"",
      "output": "true"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "s = \"(*)\"",
      "output": "true",
      "explanation": "'*' can be treated as empty string."
    },
    "PYTHON": {
      "input": "s = \"(*)\"",
      "output": "true",
      "explanation": "'*' can be treated as empty string."
    },
    "JAVA": {
      "input": "s = \"(*)\"",
      "output": "true",
      "explanation": "'*' can be treated as empty string."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "function checkValidString(s) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(checkValidString(JSON.parse(lines[0])));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def checkValidString(self, s: str) -> bool:\n        pass",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function checkValidString(s) {\n  let cmin = 0, cmax = 0;\n  for (const ch of s) {\n    if (ch === '(') {\n      cmin++; cmax++;\n    } else if (ch === ')') {\n      cmin--; cmax--;\n    } else if (ch === '*') {\n      cmin--; cmax++;\n    }\n    if (cmax < 0) return false;\n    if (cmin < 0) cmin = 0;\n  }\n  return cmin === 0;\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(checkValidString(JSON.parse(lines[0])));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def checkValidString(self, s: str) -> bool:\n        cmin = cmax = 0\n        for ch in s:\n            if ch == '(':\n                cmin, cmax = cmin + 1, cmax + 1\n            elif ch == ')':\n                cmin, cmax = cmin - 1, cmax - 1\n            elif ch == '*':\n                cmin, cmax = cmin - 1, cmax + 1\n            if cmax < 0: return False\n            if cmin < 0: cmin = 0\n        return cmin == 0",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_128: ProblemSeed = {
  "title": "Insert Interval",
  "description": "You are given an array of non-overlapping intervals intervals where intervals[i] = [starti, endi] represent the start and the end of the ith interval and intervals is sorted in ascending order by starti. You are also given an interval newInterval = [start, end] that represents the start and end of another interval.\nInsert newInterval into intervals such that intervals is still sorted in ascending order by starti and intervals still does not have any overlapping intervals (merge overlapping intervals if necessary).\nReturn intervals after the insertion.",
  "difficulty": "MEDIUM",
  "tags": [
    "Intervals",
    "Array"
  ],
  "constraints": "0 <= intervals.length <= 10^4\nintervals[i].length == 2\n0 <= starti <= endi <= 10^5\nintervals is sorted by starti in ascending order.\nnewInterval.length == 2\n0 <= start <= end <= 10^5",
  "hints": "Collect intervals before newInterval, merge all overlapping ones, then collect remaining intervals.",
  "editorial": "Approach: Three phases: 1) Add all intervals that end before newInterval begins. 2) Merge all overlapping intervals by taking min start and max end. 3) Add all remaining intervals.\nTime Complexity: O(n)\nSpace Complexity: O(n)",
  "testCases": [
    {
      "input": "[[1,3],[6,9]]\n[2,5]",
      "output": "[[1,5],[6,9]]"
    },
    {
      "input": "[[1,2],[3,5],[6,7],[8,10],[12,16]]\n[4,8]",
      "output": "[[1,2],[3,10],[12,16]]"
    },
    {
      "input": "[]\n[5,7]",
      "output": "[[5,7]]"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "intervals = [[1,3],[6,9]], newInterval = [2,5]",
      "output": "[[1,5],[6,9]]",
      "explanation": "Because [2,5] overlaps with [1,3], they merge into [1,5]."
    },
    "PYTHON": {
      "input": "intervals = [[1,3],[6,9]], newInterval = [2,5]",
      "output": "[[1,5],[6,9]]",
      "explanation": "Because [2,5] overlaps with [1,3], they merge into [1,5]."
    },
    "JAVA": {
      "input": "intervals = [[1,3],[6,9]], newInterval = [2,5]",
      "output": "[[1,5],[6,9]]",
      "explanation": "Because [2,5] overlaps with [1,3], they merge into [1,5]."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "function insert(intervals, newInterval) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(JSON.stringify(insert(JSON.parse(lines[0]), JSON.parse(lines[1]))));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def insert(self, intervals: list[list[int]], newInterval: list[int]) -> list[list[int]]:\n        pass",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function insert(intervals, newInterval) {\n  const res = [];\n  let i = 0;\n  const n = intervals.length;\n  while (i < n && intervals[i][1] < newInterval[0]) {\n    res.push(intervals[i++]);\n  }\n  while (i < n && intervals[i][0] <= newInterval[1]) {\n    newInterval[0] = Math.min(newInterval[0], intervals[i][0]);\n    newInterval[1] = Math.max(newInterval[1], intervals[i][1]);\n    i++;\n  }\n  res.push(newInterval);\n  while (i < n) {\n    res.push(intervals[i++]);\n  }\n  return res;\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(JSON.stringify(insert(JSON.parse(lines[0]), JSON.parse(lines[1]))));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def insert(self, intervals: list[list[int]], newInterval: list[int]) -> list[list[int]]:\n        res = []\n        i = 0\n        n = len(intervals)\n        while i < n and intervals[i][1] < newInterval[0]:\n            res.append(intervals[i])\n            i += 1\n        while i < n and intervals[i][0] <= newInterval[1]:\n            newInterval[0] = min(newInterval[0], intervals[i][0])\n            newInterval[1] = max(newInterval[1], intervals[i][1])\n            i += 1\n        res.append(newInterval)\n        while i < n:\n            res.append(intervals[i])\n            i += 1\n        return res",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_129: ProblemSeed = {
  "title": "Merge Intervals",
  "description": "Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.",
  "difficulty": "MEDIUM",
  "tags": [
    "Intervals",
    "Array",
    "Sorting"
  ],
  "constraints": "1 <= intervals.length <= 10^4\nintervals[i].length == 2\n0 <= starti <= endi <= 10^4",
  "hints": "Sort intervals by start time. If current interval overlaps with previous, extend previous's end.",
  "editorial": "Approach: Sort intervals by start time. Iterate through sorted intervals; if current interval overlaps with last merged interval, update last interval's end to max(end1, end2). Otherwise, append current interval.\nTime Complexity: O(n log n)\nSpace Complexity: O(n)",
  "testCases": [
    {
      "input": "[[1,3],[2,6],[8,10],[15,18]]",
      "output": "[[1,6],[8,10],[15,18]]"
    },
    {
      "input": "[[1,4],[4,5]]",
      "output": "[[1,5]]"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "intervals = [[1,3],[2,6],[8,10],[15,18]]",
      "output": "[[1,6],[8,10],[15,18]]",
      "explanation": "Since [1,3] and [2,6] overlap, merge them into [1,6]."
    },
    "PYTHON": {
      "input": "intervals = [[1,3],[2,6],[8,10],[15,18]]",
      "output": "[[1,6],[8,10],[15,18]]",
      "explanation": "Since [1,3] and [2,6] overlap, merge them into [1,6]."
    },
    "JAVA": {
      "input": "intervals = [[1,3],[2,6],[8,10],[15,18]]",
      "output": "[[1,6],[8,10],[15,18]]",
      "explanation": "Since [1,3] and [2,6] overlap, merge them into [1,6]."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "function merge(intervals) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(JSON.stringify(merge(JSON.parse(lines[0]))));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def merge(self, intervals: list[list[int]]) -> list[list[int]]:\n        pass",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function merge(intervals) {\n  if (!intervals.length) return [];\n  intervals.sort((a, b) => a[0] - b[0]);\n  const res = [intervals[0]];\n  for (let i = 1; i < intervals.length; i++) {\n    const last = res[res.length - 1];\n    if (intervals[i][0] <= last[1]) {\n      last[1] = Math.max(last[1], intervals[i][1]);\n    } else {\n      res.push(intervals[i]);\n    }\n  }\n  return res;\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(JSON.stringify(merge(JSON.parse(lines[0]))));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def merge(self, intervals: list[list[int]]) -> list[list[int]]:\n        if not intervals: return []\n        intervals.sort(key=lambda x: x[0])\n        res = [intervals[0]]\n        for curr in intervals[1:]:\n            if curr[0] <= res[-1][1]:\n                res[-1][1] = max(res[-1][1], curr[1])\n            else:\n                res.append(curr)\n        return res",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_130: ProblemSeed = {
  "title": "Non-overlapping Intervals",
  "description": "Given an array of intervals intervals where intervals[i] = [starti, endi], return the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping.",
  "difficulty": "MEDIUM",
  "tags": [
    "Intervals",
    "Array",
    "Dynamic Programming",
    "Greedy",
    "Sorting"
  ],
  "constraints": "1 <= intervals.length <= 10^5\nintervals[i].length == 2\n-5 * 10^4 <= starti < endi <= 5 * 10^4",
  "hints": "Sort by end time and greedily keep intervals that finish earliest.",
  "editorial": "Approach: Sort intervals by end time. Keep track of the end of the last included interval. If the next interval starts before the current end, it must be removed (increment removals).\nTime Complexity: O(n log n)\nSpace Complexity: O(1)",
  "testCases": [
    {
      "input": "[[1,2],[2,3],[3,4],[1,3]]",
      "output": "1"
    },
    {
      "input": "[[1,2],[1,2],[1,2]]",
      "output": "2"
    },
    {
      "input": "[[1,2],[2,3]]",
      "output": "0"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "intervals = [[1,2],[2,3],[3,4],[1,3]]",
      "output": "1",
      "explanation": "[1,3] can be removed and the rest are non-overlapping."
    },
    "PYTHON": {
      "input": "intervals = [[1,2],[2,3],[3,4],[1,3]]",
      "output": "1",
      "explanation": "[1,3] can be removed and the rest are non-overlapping."
    },
    "JAVA": {
      "input": "intervals = [[1,2],[2,3],[3,4],[1,3]]",
      "output": "1",
      "explanation": "[1,3] can be removed and the rest are non-overlapping."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "function eraseOverlapIntervals(intervals) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(eraseOverlapIntervals(JSON.parse(lines[0])));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def eraseOverlapIntervals(self, intervals: list[list[int]]) -> int:\n        pass",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function eraseOverlapIntervals(intervals) {\n  if (!intervals.length) return 0;\n  intervals.sort((a, b) => a[1] - b[1]);\n  let count = 0, prevEnd = intervals[0][1];\n  for (let i = 1; i < intervals.length; i++) {\n    if (intervals[i][0] < prevEnd) {\n      count++;\n    } else {\n      prevEnd = intervals[i][1];\n    }\n  }\n  return count;\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(eraseOverlapIntervals(JSON.parse(lines[0])));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def eraseOverlapIntervals(self, intervals: list[list[int]]) -> int:\n        if not intervals: return 0\n        intervals.sort(key=lambda x: x[1])\n        count, prev_end = 0, intervals[0][1]\n        for i in range(1, len(intervals)):\n            if intervals[i][0] < prev_end: count += 1\n            else: prev_end = intervals[i][1]\n        return count",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_131: ProblemSeed = {
  "title": "Meeting Rooms",
  "description": "Given an array of meeting time intervals where intervals[i] = [starti, endi], determine if a person could attend all meetings.",
  "difficulty": "EASY",
  "tags": [
    "Intervals",
    "Array",
    "Sorting"
  ],
  "constraints": "0 <= intervals.length <= 10^4\nintervals[i].length == 2\n0 <= starti < endi <= 10^6",
  "hints": "Sort by start times and check if intervals[i][0] < intervals[i - 1][1].",
  "editorial": "Approach: Sort intervals by start time. Check if any meeting starts before the previous meeting ends. If so, return false.\nTime Complexity: O(n log n)\nSpace Complexity: O(1)",
  "testCases": [
    {
      "input": "[[0,30],[5,10],[15,20]]",
      "output": "false"
    },
    {
      "input": "[[7,10],[2,4]]",
      "output": "true"
    },
    {
      "input": "[]",
      "output": "true"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "intervals = [[0,30],[5,10],[15,20]]",
      "output": "false",
      "explanation": "Person cannot attend both [0,30] and [5,10]."
    },
    "PYTHON": {
      "input": "intervals = [[0,30],[5,10],[15,20]]",
      "output": "false",
      "explanation": "Person cannot attend both [0,30] and [5,10]."
    },
    "JAVA": {
      "input": "intervals = [[0,30],[5,10],[15,20]]",
      "output": "false",
      "explanation": "Person cannot attend both [0,30] and [5,10]."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "function canAttendMeetings(intervals) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(canAttendMeetings(JSON.parse(lines[0] || '[]')));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def canAttendMeetings(self, intervals: list[list[int]]) -> bool:\n        pass",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function canAttendMeetings(intervals) {\n  intervals.sort((a, b) => a[0] - b[0]);\n  for (let i = 1; i < intervals.length; i++) {\n    if (intervals[i][0] < intervals[i - 1][1]) return false;\n  }\n  return true;\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(canAttendMeetings(JSON.parse(lines[0] || '[]')));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def canAttendMeetings(self, intervals: list[list[int]]) -> bool:\n        intervals.sort(key=lambda x: x[0])\n        for i in range(1, len(intervals)):\n            if intervals[i][0] < intervals[i-1][1]: return False\n        return True",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_132: ProblemSeed = {
  "title": "Meeting Rooms II",
  "description": "Given an array of meeting time intervals intervals where intervals[i] = [starti, endi], return the minimum number of conference rooms required.",
  "difficulty": "MEDIUM",
  "tags": [
    "Intervals",
    "Array",
    "Two Pointers",
    "Greedy",
    "Sorting",
    "Heap"
  ],
  "constraints": "1 <= intervals.length <= 10^4\n0 <= starti < endi <= 10^6",
  "hints": "Separate start and end times into two sorted arrays and use two pointers.",
  "editorial": "Approach: Sort starts and ends separately. Use two pointers: when start < end, a new room is needed (increment count); when start >= end, a room was freed (advance end pointer).\nTime Complexity: O(n log n)\nSpace Complexity: O(n)",
  "testCases": [
    {
      "input": "[[0,30],[5,10],[15,20]]",
      "output": "2"
    },
    {
      "input": "[[7,10],[2,4]]",
      "output": "1"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "intervals = [[0,30],[5,10],[15,20]]",
      "output": "2",
      "explanation": "At least 2 rooms needed."
    },
    "PYTHON": {
      "input": "intervals = [[0,30],[5,10],[15,20]]",
      "output": "2",
      "explanation": "At least 2 rooms needed."
    },
    "JAVA": {
      "input": "intervals = [[0,30],[5,10],[15,20]]",
      "output": "2",
      "explanation": "At least 2 rooms needed."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "function minMeetingRooms(intervals) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(minMeetingRooms(JSON.parse(lines[0])));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def minMeetingRooms(self, intervals: list[list[int]]) -> int:\n        pass",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function minMeetingRooms(intervals) {\n  const starts = intervals.map(i => i[0]).sort((a, b) => a - b);\n  const ends = intervals.map(i => i[1]).sort((a, b) => a - b);\n  let rooms = 0, endPtr = 0;\n  for (let i = 0; i < starts.length; i++) {\n    if (starts[i] < ends[endPtr]) rooms++;\n    else endPtr++;\n  }\n  return rooms;\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(minMeetingRooms(JSON.parse(lines[0])));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def minMeetingRooms(self, intervals: list[list[int]]) -> int:\n        starts = sorted([i[0] for i in intervals])\n        ends = sorted([i[1] for i in intervals])\n        rooms, end_ptr = 0, 0\n        for s in starts:\n            if s < ends[end_ptr]: rooms += 1\n            else: end_ptr += 1\n        return rooms",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_133: ProblemSeed = {
  "title": "Minimum Interval to Include Each Query",
  "description": "You are given a 2D integer array intervals, where intervals[i] = [lefti, righti] describes the ith interval starting at lefti and ending at righti (inclusive). The size of an interval is defined as the number of integers it contains, or more formally righti - lefti + 1.\nYou are also given an integer array queries. The answer to the jth query is the size of the smallest interval i such that lefti <= queries[j] <= righti. If no such interval exists, the answer is -1.\nReturn an array ans containing the answers to the queries.",
  "difficulty": "HARD",
  "tags": [
    "Intervals",
    "Array",
    "Binary Search",
    "Sorting",
    "Heap"
  ],
  "constraints": "1 <= intervals.length <= 10^5\n1 <= queries.length <= 10^5\nintervals[i].length == 2\n1 <= lefti <= righti <= 10^7\n1 <= queries[j] <= 10^7",
  "hints": "Sort queries with their original indices. Use a min-heap sorted by interval size.",
  "editorial": "Approach: Sort intervals and queries. For each query q, add all intervals with start <= q into a min-heap ordered by (right - left + 1). Pop intervals with end < q. The top of heap is the answer.\nTime Complexity: O(n log n + q log q)\nSpace Complexity: O(n + q)",
  "testCases": [
    {
      "input": "[[1,4],[2,4],[3,6],[4,4]]\n[2,3,4,5]",
      "output": "[3,3,1,4]"
    },
    {
      "input": "[[2,3],[2,5],[1,8],[20,25]]\n[2,19,5,22]",
      "output": "[2,-1,4,6]"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "intervals = [[1,4],[2,4],[3,6],[4,4]], queries = [2,3,4,5]",
      "output": "[3,3,1,4]",
      "explanation": "Smallest intervals covering each query found."
    },
    "PYTHON": {
      "input": "intervals = [[1,4],[2,4],[3,6],[4,4]], queries = [2,3,4,5]",
      "output": "[3,3,1,4]",
      "explanation": "Smallest intervals covering each query found."
    },
    "JAVA": {
      "input": "intervals = [[1,4],[2,4],[3,6],[4,4]], queries = [2,3,4,5]",
      "output": "[3,3,1,4]",
      "explanation": "Smallest intervals covering each query found."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "function minInterval(intervals, queries) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(JSON.stringify(minInterval(JSON.parse(lines[0]), JSON.parse(lines[1]))));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def minInterval(self, intervals: list[list[int]], queries: list[int]) -> list[int]:\n        pass",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function minInterval(intervals, queries) {\n  intervals.sort((a, b) => a[0] - b[0]);\n  const sortedQ = queries.map((q, i) => [q, i]).sort((a, b) => a[0] - b[0]);\n  const res = new Array(queries.length).fill(-1);\n  // Heap storing [size, end]\n  const heap = [];\n  function pushHeap(item) {\n    heap.push(item);\n    let idx = heap.length - 1;\n    while (idx > 0) {\n      const p = Math.floor((idx - 1) / 2);\n      if (heap[p][0] <= heap[idx][0]) break;\n      [heap[p], heap[idx]] = [heap[idx], heap[p]];\n      idx = p;\n    }\n  }\n  function popHeap() {\n    const min = heap[0];\n    const last = heap.pop();\n    if (heap.length > 0) {\n      heap[0] = last;\n      let idx = 0;\n      while (true) {\n        let left = 2 * idx + 1, right = 2 * idx + 2, smallest = idx;\n        if (left < heap.length && heap[left][0] < heap[smallest][0]) smallest = left;\n        if (right < heap.length && heap[right][0] < heap[smallest][0]) smallest = right;\n        if (smallest === idx) break;\n        [heap[idx], heap[smallest]] = [heap[smallest], heap[idx]];\n        idx = smallest;\n      }\n    }\n    return min;\n  }\n  let i = 0;\n  for (const [q, idx] of sortedQ) {\n    while (i < intervals.length && intervals[i][0] <= q) {\n      const [l, r] = intervals[i++];\n      pushHeap([r - l + 1, r]);\n    }\n    while (heap.length && heap[0][1] < q) {\n      popHeap();\n    }\n    res[idx] = heap.length ? heap[0][0] : -1;\n  }\n  return res;\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(JSON.stringify(minInterval(JSON.parse(lines[0]), JSON.parse(lines[1]))));\n});",
    "PYTHON": "import sys, json, heapq\nclass Solution:\n    def minInterval(self, intervals: list[list[int]], queries: list[int]) -> list[int]:\n        intervals.sort(key=lambda x: x[0])\n        heap = []\n        res = {}\n        i = 0\n        for q in sorted(queries):\n            while i < len(intervals) and intervals[i][0] <= q:\n                l, r = intervals[i]\n                heapq.heappush(heap, (r - l + 1, r))\n                i += 1\n            while heap and heap[0][1] < q:\n                heapq.heappop(heap)\n            res[q] = heap[0][0] if heap else -1\n        return [res[q] for q in queries]",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_134: ProblemSeed = {
  "title": "Rotate Image",
  "description": "You are given an n x n 2D matrix representing an image, rotate the image by 90 degrees (clockwise).\nYou have to rotate the image in-place, which means you have to modify the input 2D matrix directly. DO NOT allocate another 2D matrix and do the rotation.",
  "difficulty": "MEDIUM",
  "tags": [
    "Math & Geometry",
    "Array",
    "Matrix"
  ],
  "constraints": "n == matrix.length == matrix[i].length\n1 <= n <= 20\n-1000 <= matrix[i][j] <= 1000",
  "hints": "Transpose the matrix, then reverse each row.",
  "editorial": "Approach: Transpose the matrix across the main diagonal (swap matrix[i][j] and matrix[j][i]), then reverse each row horizontally.\nTime Complexity: O(n^2)\nSpace Complexity: O(1)",
  "testCases": [
    {
      "input": "[[1,2,3],[4,5,6],[7,8,9]]",
      "output": "[[7,4,1],[8,5,2],[9,6,3]]"
    },
    {
      "input": "[[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]",
      "output": "[[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "matrix = [[1,2,3],[4,5,6],[7,8,9]]",
      "output": "[[7,4,1],[8,5,2],[9,6,3]]",
      "explanation": "Rotated 90 degrees clockwise."
    },
    "PYTHON": {
      "input": "matrix = [[1,2,3],[4,5,6],[7,8,9]]",
      "output": "[[7,4,1],[8,5,2],[9,6,3]]",
      "explanation": "Rotated 90 degrees clockwise."
    },
    "JAVA": {
      "input": "matrix = [[1,2,3],[4,5,6],[7,8,9]]",
      "output": "[[7,4,1],[8,5,2],[9,6,3]]",
      "explanation": "Rotated 90 degrees clockwise."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "function rotate(matrix) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  const m = JSON.parse(lines[0]);\n  rotate(m);\n  console.log(JSON.stringify(m));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def rotate(self, matrix: list[list[int]]) -> None:\n        pass",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function rotate(matrix) {\n  const n = matrix.length;\n  for (let i = 0; i < n; i++) {\n    for (let j = i + 1; j < n; j++) {\n      const temp = matrix[i][j];\n      matrix[i][j] = matrix[j][i];\n      matrix[j][i] = temp;\n    }\n  }\n  for (let i = 0; i < n; i++) {\n    matrix[i].reverse();\n  }\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  const m = JSON.parse(lines[0]);\n  rotate(m);\n  console.log(JSON.stringify(m));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def rotate(self, matrix: list[list[int]]) -> None:\n        n = len(matrix)\n        for i in range(n):\n            for j in range(i + 1, n):\n                matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]\n        for row in matrix:\n            row.reverse()",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_135: ProblemSeed = {
  "title": "Spiral Matrix",
  "description": "Given an m x n matrix, return all elements of the matrix in spiral order.",
  "difficulty": "MEDIUM",
  "tags": [
    "Math & Geometry",
    "Array",
    "Matrix",
    "Simulation"
  ],
  "constraints": "m == matrix.length\nn == matrix[i].length\n1 <= m, n <= 10\n-100 <= matrix[i][j] <= 100",
  "hints": "Track boundaries: top, bottom, left, right and shrink them as you traverse.",
  "editorial": "Approach: Maintain bounds (top, bottom, left, right). Traverse top row, right col, bottom row (if top <= bottom), left col (if left <= right). Shrink borders after each pass.\nTime Complexity: O(m * n)\nSpace Complexity: O(1) auxiliary",
  "testCases": [
    {
      "input": "[[1,2,3],[4,5,6],[7,8,9]]",
      "output": "[1,2,3,6,9,8,7,4,5]"
    },
    {
      "input": "[[1,2,3,4],[5,6,7,8],[9,10,11,12]]",
      "output": "[1,2,3,4,8,12,11,10,9,5,6,7]"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "matrix = [[1,2,3],[4,5,6],[7,8,9]]",
      "output": "[1,2,3,6,9,8,7,4,5]",
      "explanation": "Elements in spiral order."
    },
    "PYTHON": {
      "input": "matrix = [[1,2,3],[4,5,6],[7,8,9]]",
      "output": "[1,2,3,6,9,8,7,4,5]",
      "explanation": "Elements in spiral order."
    },
    "JAVA": {
      "input": "matrix = [[1,2,3],[4,5,6],[7,8,9]]",
      "output": "[1,2,3,6,9,8,7,4,5]",
      "explanation": "Elements in spiral order."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "function spiralOrder(matrix) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(JSON.stringify(spiralOrder(JSON.parse(lines[0]))));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def spiralOrder(self, matrix: list[list[int]]) -> list[int]:\n        pass",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function spiralOrder(matrix) {\n  const res = [];\n  let top = 0, bottom = matrix.length - 1;\n  let left = 0, right = matrix[0].length - 1;\n  while (top <= bottom && left <= right) {\n    for (let c = left; c <= right; c++) res.push(matrix[top][c]);\n    top++;\n    for (let r = top; r <= bottom; r++) res.push(matrix[r][right]);\n    right--;\n    if (top <= bottom) {\n      for (let c = right; c >= left; c--) res.push(matrix[bottom][c]);\n      bottom--;\n    }\n    if (left <= right) {\n      for (let r = bottom; r >= top; r--) res.push(matrix[r][left]);\n      left++;\n    }\n  }\n  return res;\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(JSON.stringify(spiralOrder(JSON.parse(lines[0]))));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def spiralOrder(self, matrix: list[list[int]]) -> list[int]:\n        res = []\n        top, bottom = 0, len(matrix) - 1\n        left, right = 0, len(matrix[0]) - 1\n        while top <= bottom and left <= right:\n            for c in range(left, right + 1): res.append(matrix[top][c])\n            top += 1\n            for r in range(top, bottom + 1): res.append(matrix[r][right])\n            right -= 1\n            if top <= bottom:\n                for c in range(right, left - 1, -1): res.append(matrix[bottom][c])\n                bottom -= 1\n            if left <= right:\n                for r in range(bottom, top - 1, -1): res.append(matrix[r][left])\n                left += 1\n        return res",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_136: ProblemSeed = {
  "title": "Set Matrix Zeroes",
  "description": "Given an m x n integer matrix matrix, if an element is 0, set its entire row and column to 0's.\nYou must do it in place.",
  "difficulty": "MEDIUM",
  "tags": [
    "Math & Geometry",
    "Array",
    "Matrix"
  ],
  "constraints": "m == matrix.length\nn == matrix[0].length\n1 <= m, n <= 200\n-2^31 <= matrix[i][j] <= 2^31 - 1",
  "hints": "Use the first row and first column as flags to achieve O(1) space.",
  "editorial": "Approach: Use first row and column as zero markers. Track if first row and first col themselves contain 0 with two flags. Then set inner matrix cells to 0, and lastly handle first row/col.\nTime Complexity: O(m * n)\nSpace Complexity: O(1)",
  "testCases": [
    {
      "input": "[[1,1,1],[1,0,1],[1,1,1]]",
      "output": "[[1,0,1],[0,0,0],[1,0,1]]"
    },
    {
      "input": "[[0,1,2,0],[3,4,5,2],[1,3,1,5]]",
      "output": "[[0,0,0,0],[0,4,5,0],[0,3,1,0]]"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "matrix = [[1,1,1],[1,0,1],[1,1,1]]",
      "output": "[[1,0,1],[0,0,0],[1,0,1]]",
      "explanation": "Row 1 and column 1 set to 0."
    },
    "PYTHON": {
      "input": "matrix = [[1,1,1],[1,0,1],[1,1,1]]",
      "output": "[[1,0,1],[0,0,0],[1,0,1]]",
      "explanation": "Row 1 and column 1 set to 0."
    },
    "JAVA": {
      "input": "matrix = [[1,1,1],[1,0,1],[1,1,1]]",
      "output": "[[1,0,1],[0,0,0],[1,0,1]]",
      "explanation": "Row 1 and column 1 set to 0."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "function setZeroes(matrix) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  const m = JSON.parse(lines[0]);\n  setZeroes(m);\n  console.log(JSON.stringify(m));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def setZeroes(self, matrix: list[list[int]]) -> None:\n        pass",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function setZeroes(matrix) {\n  const R = matrix.length, C = matrix[0].length;\n  let firstRowZero = false, firstColZero = false;\n  for (let r = 0; r < R; r++) {\n    if (matrix[r][0] === 0) firstColZero = true;\n  }\n  for (let c = 0; c < C; c++) {\n    if (matrix[0][c] === 0) firstRowZero = true;\n  }\n  for (let r = 1; r < R; r++) {\n    for (let c = 1; c < C; c++) {\n      if (matrix[r][c] === 0) {\n        matrix[r][0] = 0;\n        matrix[0][c] = 0;\n      }\n    }\n  }\n  for (let r = 1; r < R; r++) {\n    for (let c = 1; c < C; c++) {\n      if (matrix[r][0] === 0 || matrix[0][c] === 0) matrix[r][c] = 0;\n    }\n  }\n  if (firstColZero) {\n    for (let r = 0; r < R; r++) matrix[r][0] = 0;\n  }\n  if (firstRowZero) {\n    for (let c = 0; c < C; c++) matrix[0][c] = 0;\n  }\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  const m = JSON.parse(lines[0]);\n  setZeroes(m);\n  console.log(JSON.stringify(m));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def setZeroes(self, matrix: list[list[int]]) -> None:\n        R, C = len(matrix), len(matrix[0])\n        first_col_zero = any(matrix[r][0] == 0 for r in range(R))\n        first_row_zero = any(matrix[0][c] == 0 for c in range(C))\n        for r in range(1, R):\n            for c in range(1, C):\n                if matrix[r][c] == 0:\n                    matrix[r][0] = matrix[0][c] = 0\n        for r in range(1, R):\n            for c in range(1, C):\n                if matrix[r][0] == 0 or matrix[0][c] == 0:\n                    matrix[r][c] = 0\n        if first_col_zero:\n            for r in range(R): matrix[r][0] = 0\n        if first_row_zero:\n            for c in range(C): matrix[0][c] = 0",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_137: ProblemSeed = {
  "title": "Happy Number",
  "description": "Write an algorithm to determine if a number n is happy.\nA happy number is a number defined by the following process:\n- Starting with any positive integer, replace the number by the sum of the squares of its digits.\n- Repeat the process until the number equals 1 (where it will stay), or it loops endlessly in a cycle which does not include 1.\n- Those numbers for which this process ends in 1 are happy.\nReturn true if n is a happy number, and false if not.",
  "difficulty": "EASY",
  "tags": [
    "Math & Geometry",
    "Hash Table",
    "Two Pointers"
  ],
  "constraints": "1 <= n <= 2^31 - 1",
  "hints": "Floyd's Cycle-Finding Algorithm (slow and fast pointers) or a hash set.",
  "editorial": "Approach: Replace n with sum of square of digits. Track visited numbers using a Set or slow/fast pointers. If 1 is reached, return true; if cycle detected, return false.\nTime Complexity: O(log n)\nSpace Complexity: O(log n)",
  "testCases": [
    {
      "input": "19",
      "output": "true"
    },
    {
      "input": "2",
      "output": "false"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "n = 19",
      "output": "true",
      "explanation": "1^2 + 9^2 = 82 -> ... -> 1."
    },
    "PYTHON": {
      "input": "n = 19",
      "output": "true",
      "explanation": "1^2 + 9^2 = 82 -> ... -> 1."
    },
    "JAVA": {
      "input": "n = 19",
      "output": "true",
      "explanation": "1^2 + 9^2 = 82 -> ... -> 1."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "function isHappy(n) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(isHappy(parseInt(lines[0], 10)));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def isHappy(self, n: int) -> bool:\n        pass",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function isHappy(n) {\n  const seen = new Set();\n  function getNext(num) {\n    let sum = 0;\n    while (num > 0) {\n      const d = num % 10;\n      sum += d * d;\n      num = Math.floor(num / 10);\n    }\n    return sum;\n  }\n  while (n !== 1 && !seen.has(n)) {\n    seen.add(n);\n    n = getNext(n);\n  }\n  return n === 1;\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(isHappy(parseInt(lines[0], 10)));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def isHappy(self, n: int) -> bool:\n        seen = set()\n        def get_next(x):\n            return sum(int(d)**2 for d in str(x))\n        while n != 1 and n not in seen:\n            seen.add(n)\n            n = get_next(n)\n        return n == 1",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_138: ProblemSeed = {
  "title": "Plus One",
  "description": "You are given a large integer represented as an integer array digits, where each digits[i] is the ith digit of the integer. The digits are ordered from most significant to least significant in left-to-right order. The large integer does not contain any leading 0's.\nIncrement the large integer by one and return the resulting array of digits.",
  "difficulty": "EASY",
  "tags": [
    "Math & Geometry",
    "Array"
  ],
  "constraints": "1 <= digits.length <= 100\n0 <= digits[i] <= 9\ndigits does not contain any leading 0's.",
  "hints": "Iterate from right to left, adding carry.",
  "editorial": "Approach: Loop backwards. If digit < 9, increment and return. Else set to 0. If loop finishes, prepend 1.\nTime Complexity: O(n)\nSpace Complexity: O(1)",
  "testCases": [
    {
      "input": "[1,2,3]",
      "output": "[1,2,4]"
    },
    {
      "input": "[4,3,2,1]",
      "output": "[4,3,2,2]"
    },
    {
      "input": "[9]",
      "output": "[1,0]"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "digits = [1,2,3]",
      "output": "[1,2,4]",
      "explanation": "123 + 1 = 124."
    },
    "PYTHON": {
      "input": "digits = [1,2,3]",
      "output": "[1,2,4]",
      "explanation": "123 + 1 = 124."
    },
    "JAVA": {
      "input": "digits = [1,2,3]",
      "output": "[1,2,4]",
      "explanation": "123 + 1 = 124."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "function plusOne(digits) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(JSON.stringify(plusOne(JSON.parse(lines[0]))));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def plusOne(self, digits: list[int]) -> list[int]:\n        pass",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function plusOne(digits) {\n  for (let i = digits.length - 1; i >= 0; i--) {\n    if (digits[i] < 9) {\n      digits[i]++;\n      return digits;\n    }\n    digits[i] = 0;\n  }\n  digits.unshift(1);\n  return digits;\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(JSON.stringify(plusOne(JSON.parse(lines[0]))));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def plusOne(self, digits: list[int]) -> list[int]:\n        for i in range(len(digits) - 1, -1, -1):\n            if digits[i] < 9:\n                digits[i] += 1\n                return digits\n            digits[i] = 0\n        return [1] + digits",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_139: ProblemSeed = {
  "title": "Pow(x, n)",
  "description": "Implement pow(x, n), which calculates x raised to the power n (i.e., x^n).",
  "difficulty": "MEDIUM",
  "tags": [
    "Math & Geometry",
    "Recursion"
  ],
  "constraints": "-100.0 < x < 100.0\n-2^31 <= n <= 2^31 - 1\nn is an integer.\nEither x is not zero or n > 0.\n-10^4 <= x^n <= 10^4",
  "hints": "Binary exponentiation: x^n = (x^2)^(n/2). Handle negative n by inverting x.",
  "editorial": "Approach: Fast binary exponentiation (divide and conquer). If n < 0, x = 1 / x, n = -n. Repeatedly square base and halve exponent.\nTime Complexity: O(log n)\nSpace Complexity: O(1)",
  "testCases": [
    {
      "input": "2.0\n10",
      "output": "1024"
    },
    {
      "input": "2.1\n3",
      "output": "9.261"
    },
    {
      "input": "2.0\n-2",
      "output": "0.25"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "x = 2.0, n = 10",
      "output": "1024",
      "explanation": "2^10 = 1024."
    },
    "PYTHON": {
      "input": "x = 2.0, n = 10",
      "output": "1024",
      "explanation": "2^10 = 1024."
    },
    "JAVA": {
      "input": "x = 2.0, n = 10",
      "output": "1024",
      "explanation": "2^10 = 1024."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "function myPow(x, n) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  const res = myPow(parseFloat(lines[0]), parseInt(lines[1], 10));\n  console.log(Math.abs(res - Math.round(res)) < 1e-9 ? Math.round(res) : parseFloat(res.toFixed(5)));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def myPow(self, x: float, n: int) -> float:\n        pass",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function myPow(x, n) {\n  if (n === 0) return 1;\n  let N = n;\n  if (N < 0) {\n    x = 1 / x;\n    N = -N;\n  }\n  let ans = 1, currentProduct = x;\n  while (N > 0) {\n    if (N % 2 === 1) ans *= currentProduct;\n    currentProduct *= currentProduct;\n    N = Math.floor(N / 2);\n  }\n  return ans;\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  const res = myPow(parseFloat(lines[0]), parseInt(lines[1], 10));\n  console.log(Math.abs(res - Math.round(res)) < 1e-9 ? Math.round(res) : parseFloat(res.toFixed(5)));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def myPow(self, x: float, n: int) -> float:\n        return pow(x, n)",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_140: ProblemSeed = {
  "title": "Multiply Strings",
  "description": "Given two non-negative integers num1 and num2 represented as strings, return the product of num1 and num2, also represented as a string.\nNote: You must not use any built-in BigInteger library or convert the inputs to integer directly.",
  "difficulty": "MEDIUM",
  "tags": [
    "Math & Geometry",
    "String",
    "Simulation"
  ],
  "constraints": "1 <= num1.length, num2.length <= 200\nnum1 and num2 consist of digits only.\nBoth num1 and num2 do not contain any leading zero, except the number 0 itself.",
  "hints": "Simulate standard grade-school multiplication: result of num1[i] * num2[j] goes into pos [i + j, i + j + 1].",
  "editorial": "Approach: Allocate array of size len1 + len2. Multiply each pair of digits (i, j); add product to pos[i + j + 1], update carry in pos[i + j]. Join into string.\nTime Complexity: O(m * n)\nSpace Complexity: O(m + n)",
  "testCases": [
    {
      "input": "\"2\"\n\"3\"",
      "output": "\"6\""
    },
    {
      "input": "\"123\"\n\"456\"",
      "output": "\"56088\""
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "num1 = \"2\", num2 = \"3\"",
      "output": "\"6\"",
      "explanation": "2 * 3 = 6."
    },
    "PYTHON": {
      "input": "num1 = \"2\", num2 = \"3\"",
      "output": "\"6\"",
      "explanation": "2 * 3 = 6."
    },
    "JAVA": {
      "input": "num1 = \"2\", num2 = \"3\"",
      "output": "\"6\"",
      "explanation": "2 * 3 = 6."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "function multiply(num1, num2) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(JSON.stringify(multiply(JSON.parse(lines[0]), JSON.parse(lines[1]))));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def multiply(self, num1: str, num2: str) -> str:\n        pass",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function multiply(num1, num2) {\n  if (num1 === \"0\" || num2 === \"0\") return \"0\";\n  const m = num1.length, n = num2.length;\n  const pos = new Array(m + n).fill(0);\n  for (let i = m - 1; i >= 0; i--) {\n    for (let j = n - 1; j >= 0; j--) {\n      const mul = parseInt(num1[i], 10) * parseInt(num2[j], 10);\n      const p1 = i + j, p2 = i + j + 1;\n      const sum = mul + pos[p2];\n      pos[p2] = sum % 10;\n      pos[p1] += Math.floor(sum / 10);\n    }\n  }\n  while (pos.length && pos[0] === 0) pos.shift();\n  return pos.join(\"\");\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(JSON.stringify(multiply(JSON.parse(lines[0]), JSON.parse(lines[1]))));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def multiply(self, num1: str, num2: str) -> str:\n        return str(int(num1) * int(num2))",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_141: ProblemSeed = {
  "title": "Detect Squares",
  "description": "You are given a stream of points on the X-Y plane. Design an algorithm that:\n- Adds new points from the stream into a data structure. Duplicate points are allowed and should be treated as different points.\n- Given a query point, counts the number of ways to choose three points from the data structure such that the three points and the query point form an axis-aligned square with positive area.\nImplement the DetectSquares class.",
  "difficulty": "MEDIUM",
  "tags": [
    "Math & Geometry",
    "Array",
    "Hash Table",
    "Design",
    "Counting"
  ],
  "constraints": "point.length == 2\n0 <= x, y <= 1000\nAt most 3000 calls in total will be made to add and count.",
  "hints": "Find diagonal points (px, py) where abs(px - qx) == abs(py - qy) > 0, then check if (px, qy) and (qx, py) exist.",
  "editorial": "Approach: Maintain frequency of each point in a Map. For query (qx, qy), iterate over all known points (px, py). If they form a diagonal of a square with non-zero side, multiply counts of (px, py), (px, qy), and (qx, py).\nTime Complexity: add O(1), count O(total unique points)\nSpace Complexity: O(total points)",
  "testCases": [
    {
      "input": "[\"DetectSquares\",\"add\",\"add\",\"add\",\"count\",\"count\",\"add\",\"count\"]\n[[],[[3,10]],[[11,2]],[[3,2]],[[11,10]],[[14,8]],[[11,2]],[[11,10]]]",
      "output": "[null,null,null,null,1,0,null,2]"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "[\"DetectSquares\",\"add\",\"add\",\"add\",\"count\",\"count\",\"add\",\"count\"]\n[[],[[3,10]],[[11,2]],[[3,2]],[[11,10]],[[14,8]],[[11,2]],[[11,10]]]",
      "output": "[null,null,null,null,1,0,null,2]",
      "explanation": "Detects axis-aligned squares."
    },
    "PYTHON": {
      "input": "[\"DetectSquares\",\"add\",\"add\",\"add\",\"count\",\"count\",\"add\",\"count\"]\n[[],[[3,10]],[[11,2]],[[3,2]],[[11,10]],[[14,8]],[[11,2]],[[11,10]]]",
      "output": "[null,null,null,null,1,0,null,2]",
      "explanation": "Detects axis-aligned squares."
    },
    "JAVA": {
      "input": "[\"DetectSquares\",\"add\",\"add\",\"add\",\"count\",\"count\",\"add\",\"count\"]\n[[],[[3,10]],[[11,2]],[[3,2]],[[11,10]],[[14,8]],[[11,2]],[[11,10]]]",
      "output": "[null,null,null,null,1,0,null,2]",
      "explanation": "Detects axis-aligned squares."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "class DetectSquares {\n  constructor() {\n    // Write your code here\n  }\n  add(point) {\n    // Write your code here\n  }\n  count(point) {\n    // Write your code here\n  }\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  const ops = JSON.parse(lines[0]);\n  const args = JSON.parse(lines[1]);\n  let ds = null;\n  const res = [];\n  for (let i = 0; i < ops.length; i++) {\n    if (ops[i] === 'DetectSquares') { ds = new DetectSquares(); res.push(null); }\n    else if (ops[i] === 'add') { ds.add(args[i][0]); res.push(null); }\n    else if (ops[i] === 'count') { res.push(ds.count(args[i][0])); }\n  }\n  console.log(JSON.stringify(res));\n});",
    "PYTHON": "import sys, json\nclass DetectSquares:\n    def __init__(self):\n        pass\n    def add(self, point: list[int]) -> None:\n        pass\n    def count(self, point: list[int]) -> int:\n        pass",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "class DetectSquares {\n  constructor() {\n    this.pts = new Map();\n  }\n  add(point) {\n    const key = point[0] + ',' + point[1];\n    this.pts.set(key, (this.pts.get(key) || 0) + 1);\n  }\n  count(point) {\n    const [qx, qy] = point;\n    let ans = 0;\n    for (const [key, cnt] of this.pts) {\n      const [px, py] = key.split(',').map(Number);\n      if (Math.abs(qx - px) !== Math.abs(qy - py) || qx === px || qy === py) continue;\n      const p1 = this.pts.get(qx + ',' + py) || 0;\n      const p2 = this.pts.get(px + ',' + qy) || 0;\n      ans += cnt * p1 * p2;\n    }\n    return ans;\n  }\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  const ops = JSON.parse(lines[0]);\n  const args = JSON.parse(lines[1]);\n  let ds = null;\n  const res = [];\n  for (let i = 0; i < ops.length; i++) {\n    if (ops[i] === 'DetectSquares') { ds = new DetectSquares(); res.push(null); }\n    else if (ops[i] === 'add') { ds.add(args[i][0]); res.push(null); }\n    else if (ops[i] === 'count') { res.push(ds.count(args[i][0])); }\n  }\n  console.log(JSON.stringify(res));\n});",
    "PYTHON": "import sys, json\nfrom collections import defaultdict\nclass DetectSquares:\n    def __init__(self):\n        self.pts = defaultdict(int)\n    def add(self, point: list[int]) -> None:\n        self.pts[tuple(point)] += 1\n    def count(self, point: list[int]) -> int:\n        qx, qy = point\n        ans = 0\n        for (px, py), cnt in self.pts.items():\n            if abs(qx - px) != abs(qy - py) or qx == px or qy == py: continue\n            ans += cnt * self.pts.get((qx, py), 0) * self.pts.get((px, qy), 0)\n        return ans",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_142: ProblemSeed = {
  "title": "Single Number",
  "description": "Given a non-empty array of integers nums, every element appears twice except for one. Find that single one.\nYou must implement a solution with a linear runtime complexity and use only constant extra space.",
  "difficulty": "EASY",
  "tags": [
    "Bit Manipulation",
    "Array"
  ],
  "constraints": "1 <= nums.length <= 3 * 10^4\n-3 * 10^4 <= nums[i] <= 3 * 10^4\nEach element in the array appears twice except for one element which appears only once.",
  "hints": "XOR of any number with itself is 0: a ^ a = 0. a ^ 0 = a.",
  "editorial": "Approach: XOR all numbers together. Duplicate numbers cancel out (a ^ a = 0), leaving only the single number.\nTime Complexity: O(n)\nSpace Complexity: O(1)",
  "testCases": [
    {
      "input": "[2,2,1]",
      "output": "1"
    },
    {
      "input": "[4,1,2,1,2]",
      "output": "4"
    },
    {
      "input": "[1]",
      "output": "1"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "nums = [2,2,1]",
      "output": "1",
      "explanation": "1 appears once."
    },
    "PYTHON": {
      "input": "nums = [2,2,1]",
      "output": "1",
      "explanation": "1 appears once."
    },
    "JAVA": {
      "input": "nums = [2,2,1]",
      "output": "1",
      "explanation": "1 appears once."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "function singleNumber(nums) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(singleNumber(JSON.parse(lines[0])));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def singleNumber(self, nums: list[int]) -> int:\n        pass",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function singleNumber(nums) {\n  return nums.reduce((acc, num) => acc ^ num, 0);\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(singleNumber(JSON.parse(lines[0])));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def singleNumber(self, nums: list[int]) -> int:\n        res = 0\n        for n in nums: res ^= n\n        return res",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_143: ProblemSeed = {
  "title": "Number of 1 Bits",
  "description": "Write a function that takes the binary representation of an unsigned integer and returns the number of '1' bits it has (also known as the Hamming weight).",
  "difficulty": "EASY",
  "tags": [
    "Bit Manipulation",
    "Divide and Conquer"
  ],
  "constraints": "The input must be a binary string of length 32 or an integer.",
  "hints": "n & (n - 1) clears the lowest set bit.",
  "editorial": "Approach: Brian Kernighan's algorithm. In each iteration, n = n & (n - 1) clears the least significant 1-bit until n becomes 0.\nTime Complexity: O(number of 1 bits)\nSpace Complexity: O(1)",
  "testCases": [
    {
      "input": "11",
      "output": "3"
    },
    {
      "input": "128",
      "output": "1"
    },
    {
      "input": "2147483645",
      "output": "30"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "n = 11",
      "output": "3",
      "explanation": "11 in binary is 1011 which has 3 ones."
    },
    "PYTHON": {
      "input": "n = 11",
      "output": "3",
      "explanation": "11 in binary is 1011 which has 3 ones."
    },
    "JAVA": {
      "input": "n = 11",
      "output": "3",
      "explanation": "11 in binary is 1011 which has 3 ones."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "function hammingWeight(n) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(hammingWeight(parseInt(lines[0], 10)));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def hammingWeight(self, n: int) -> int:\n        pass",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function hammingWeight(n) {\n  let count = 0;\n  while (n !== 0) {\n    n = n & (n - 1);\n    count++;\n  }\n  return count;\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(hammingWeight(parseInt(lines[0], 10)));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def hammingWeight(self, n: int) -> int:\n        return bin(n).count('1')",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_144: ProblemSeed = {
  "title": "Counting Bits",
  "description": "Given an integer n, return an array ans of length n + 1 such that for each i (0 <= i <= n), ans[i] is the number of 1's in the binary representation of i.",
  "difficulty": "EASY",
  "tags": [
    "Bit Manipulation",
    "Dynamic Programming"
  ],
  "constraints": "0 <= n <= 10^5",
  "hints": "dp[i] = dp[i >> 1] + (i & 1).",
  "editorial": "Approach: DP bit manipulation. dp[i] = dp[i >> 1] + (i & 1). The number of 1s in i equals the number of 1s in i / 2 plus the last bit.\nTime Complexity: O(n)\nSpace Complexity: O(1) auxiliary",
  "testCases": [
    {
      "input": "2",
      "output": "[0,1,1]"
    },
    {
      "input": "5",
      "output": "[0,1,1,2,1,2]"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "n = 2",
      "output": "[0,1,1]",
      "explanation": "0 -> 0, 1 -> 1, 2 -> 1."
    },
    "PYTHON": {
      "input": "n = 2",
      "output": "[0,1,1]",
      "explanation": "0 -> 0, 1 -> 1, 2 -> 1."
    },
    "JAVA": {
      "input": "n = 2",
      "output": "[0,1,1]",
      "explanation": "0 -> 0, 1 -> 1, 2 -> 1."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "function countBits(n) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(JSON.stringify(countBits(parseInt(lines[0], 10))));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def countBits(self, n: int) -> list[int]:\n        pass",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function countBits(n) {\n  const ans = new Array(n + 1).fill(0);\n  for (let i = 1; i <= n; i++) {\n    ans[i] = ans[i >> 1] + (i & 1);\n  }\n  return ans;\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(JSON.stringify(countBits(parseInt(lines[0], 10))));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def countBits(self, n: int) -> list[int]:\n        ans = [0] * (n + 1)\n        for i in range(1, n + 1):\n            ans[i] = ans[i >> 1] + (i & 1)\n        return ans",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_145: ProblemSeed = {
  "title": "Reverse Bits",
  "description": "Reverse bits of a given 32 bits unsigned integer.",
  "difficulty": "EASY",
  "tags": [
    "Bit Manipulation",
    "Divide and Conquer"
  ],
  "constraints": "The input must be a binary string of length 32 or an unsigned integer.",
  "hints": "Loop 32 times: shift result left by 1 and OR with (n & 1), then shift n right.",
  "editorial": "Approach: Iterate 32 times. res = (res << 1) | (n & 1); n = n >>> 1. Use unsigned right shift `>>>` in JavaScript.\nTime Complexity: O(1)\nSpace Complexity: O(1)",
  "testCases": [
    {
      "input": "43261596",
      "output": "964176192"
    },
    {
      "input": "4294967293",
      "output": "3221225471"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "n = 43261596",
      "output": "964176192",
      "explanation": "Bits reversed."
    },
    "PYTHON": {
      "input": "n = 43261596",
      "output": "964176192",
      "explanation": "Bits reversed."
    },
    "JAVA": {
      "input": "n = 43261596",
      "output": "964176192",
      "explanation": "Bits reversed."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "function reverseBits(n) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(reverseBits(parseInt(lines[0], 10)));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def reverseBits(self, n: int) -> int:\n        pass",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function reverseBits(n) {\n  let res = 0;\n  for (let i = 0; i < 32; i++) {\n    res = (res << 1) | (n & 1);\n    n = n >>> 1;\n  }\n  return res >>> 0;\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(reverseBits(parseInt(lines[0], 10)));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def reverseBits(self, n: int) -> int:\n        res = 0\n        for _ in range(32):\n            res = (res << 1) | (n & 1)\n            n >>= 1\n        return res",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_146: ProblemSeed = {
  "title": "Missing Number",
  "description": "Given an array nums containing n distinct numbers in the range [0, n], return the only number in the range that is missing from the array.",
  "difficulty": "EASY",
  "tags": [
    "Bit Manipulation",
    "Array",
    "Hash Table",
    "Math",
    "Sorting"
  ],
  "constraints": "n == nums.length\n1 <= n <= 10^4\n0 <= nums[i] <= n\nAll the numbers of nums are unique.",
  "hints": "Compute expected sum n * (n + 1) / 2 and subtract actual sum, or use XOR.",
  "editorial": "Approach: Expected sum of 0 to n is n * (n + 1) / 2. Subtract each element in nums from expected sum; the remainder is the missing number.\nTime Complexity: O(n)\nSpace Complexity: O(1)",
  "testCases": [
    {
      "input": "[3,0,1]",
      "output": "2"
    },
    {
      "input": "[0,1]",
      "output": "2"
    },
    {
      "input": "[9,6,4,2,3,5,7,0,1]",
      "output": "8"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "nums = [3,0,1]",
      "output": "2",
      "explanation": "2 is missing in range [0, 3]."
    },
    "PYTHON": {
      "input": "nums = [3,0,1]",
      "output": "2",
      "explanation": "2 is missing in range [0, 3]."
    },
    "JAVA": {
      "input": "nums = [3,0,1]",
      "output": "2",
      "explanation": "2 is missing in range [0, 3]."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "function missingNumber(nums) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(missingNumber(JSON.parse(lines[0])));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def missingNumber(self, nums: list[int]) -> int:\n        pass",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function missingNumber(nums) {\n  const n = nums.length;\n  const expected = (n * (n + 1)) / 2;\n  const actual = nums.reduce((a, b) => a + b, 0);\n  return expected - actual;\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(missingNumber(JSON.parse(lines[0])));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def missingNumber(self, nums: list[int]) -> int:\n        n = len(nums)\n        return n * (n + 1) // 2 - sum(nums)",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_147: ProblemSeed = {
  "title": "Sum of Two Integers",
  "description": "Given two integers a and b, return the sum of the two integers without using the operators + and -.",
  "difficulty": "MEDIUM",
  "tags": [
    "Bit Manipulation",
    "Math"
  ],
  "constraints": "-1000 <= a, b <= 1000",
  "hints": "XOR (a ^ b) gives sum without carry. AND shifted left ((a & b) << 1) gives carry.",
  "editorial": "Approach: Half adder simulation. sum = a ^ b, carry = (a & b) << 1. Repeat until carry is 0.\nTime Complexity: O(1) (32 iterations max)\nSpace Complexity: O(1)",
  "testCases": [
    {
      "input": "1\n2",
      "output": "3"
    },
    {
      "input": "2\n3",
      "output": "5"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "a = 1, b = 2",
      "output": "3",
      "explanation": "1 + 2 = 3."
    },
    "PYTHON": {
      "input": "a = 1, b = 2",
      "output": "3",
      "explanation": "1 + 2 = 3."
    },
    "JAVA": {
      "input": "a = 1, b = 2",
      "output": "3",
      "explanation": "1 + 2 = 3."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "function getSum(a, b) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(getSum(parseInt(lines[0], 10), parseInt(lines[1], 10)));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def getSum(self, a: int, b: int) -> int:\n        pass",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function getSum(a, b) {\n  while (b !== 0) {\n    const carry = (a & b) << 1;\n    a = a ^ b;\n    b = carry;\n  }\n  return a;\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(getSum(parseInt(lines[0], 10), parseInt(lines[1], 10)));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def getSum(self, a: int, b: int) -> int:\n        mask = 0xFFFFFFFF\n        while b & mask != 0:\n            carry = (a & b) << 1\n            a = a ^ b\n            b = carry\n        return a & mask if b > 0 else a",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

export const problemSeed_148: ProblemSeed = {
  "title": "Reverse Integer",
  "description": "Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range [-2^31, 2^31 - 1], then return 0.\nAssume the environment does not allow you to store 64-bit integers (signed or unsigned).",
  "difficulty": "MEDIUM",
  "tags": [
    "Bit Manipulation",
    "Math"
  ],
  "constraints": "-2^31 <= x <= 2^31 - 1",
  "hints": "Extract digits using % 10 and build result. Check for 32-bit overflow before returning.",
  "editorial": "Approach: Pop digits from x using % 10, push to reversed integer. Check boundary conditions [-2^31, 2^31 - 1] to return 0 on overflow.\nTime Complexity: O(log x)\nSpace Complexity: O(1)",
  "testCases": [
    {
      "input": "123",
      "output": "321"
    },
    {
      "input": "-123",
      "output": "-321"
    },
    {
      "input": "120",
      "output": "21"
    }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "x = 123",
      "output": "321",
      "explanation": "Digits reversed."
    },
    "PYTHON": {
      "input": "x = 123",
      "output": "321",
      "explanation": "Digits reversed."
    },
    "JAVA": {
      "input": "x = 123",
      "output": "321",
      "explanation": "Digits reversed."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "function reverse(x) {\n  // Write your code here\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(reverse(parseInt(lines[0], 10)));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def reverse(self, x: int) -> int:\n        pass",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function reverse(x) {\n  const sign = x < 0 ? -1 : 1;\n  let num = Math.abs(x);\n  let rev = 0;\n  while (num > 0) {\n    rev = rev * 10 + (num % 10);\n    num = Math.floor(num / 10);\n  }\n  rev *= sign;\n  if (rev < -Math.pow(2, 31) || rev > Math.pow(2, 31) - 1) return 0;\n  return rev;\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });\nconst lines = [];\nrl.on('line', (line) => lines.push(line.trim()));\nrl.on('close', () => {\n  console.log(reverse(parseInt(lines[0], 10)));\n});",
    "PYTHON": "import sys, json\nclass Solution:\n    def reverse(self, x: int) -> int:\n        sign = -1 if x < 0 else 1\n        rev = int(str(abs(x))[::-1]) * sign\n        if rev < -2**31 or rev > 2**31 - 1: return 0\n        return rev",
    "JAVA": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}"
  }
};

/** All problems to seed — total: 150 */
export const problemSeeds: ProblemSeed[] = [
  sampleDpData,
  sampleStringProblem,
  problemSeed_1,
  problemSeed_2,
  problemSeed_3,
  problemSeed_4,
  problemSeed_5,
  problemSeed_6,
  problemSeed_7,
  problemSeed_8,
  problemSeed_9,
  problemSeed_10,
  problemSeed_11,
  problemSeed_12,
  problemSeed_13,
  problemSeed_14,
  problemSeed_15,
  problemSeed_16,
  problemSeed_17,
  problemSeed_18,
  problemSeed_19,
  problemSeed_20,
  problemSeed_21,
  problemSeed_22,
  problemSeed_23,
  problemSeed_24,
  problemSeed_25,
  problemSeed_26,
  problemSeed_27,
  problemSeed_28,
  problemSeed_29,
  problemSeed_30,
  problemSeed_31,
  problemSeed_32,
  problemSeed_33,
  problemSeed_34,
  problemSeed_35,
  problemSeed_36,
  problemSeed_37,
  problemSeed_38,
  problemSeed_39,
  problemSeed_40,
  problemSeed_41,
  problemSeed_42,
  problemSeed_43,
  problemSeed_44,
  problemSeed_45,
  problemSeed_46,
  problemSeed_47,
  problemSeed_48,
  problemSeed_49,
  problemSeed_50,
  problemSeed_51,
  problemSeed_52,
  problemSeed_53,
  problemSeed_54,
  problemSeed_55,
  problemSeed_56,
  problemSeed_57,
  problemSeed_58,
  problemSeed_59,
  problemSeed_60,
  problemSeed_61,
  problemSeed_62,
  problemSeed_63,
  problemSeed_64,
  problemSeed_65,
  problemSeed_66,
  problemSeed_67,
  problemSeed_68,
  problemSeed_69,
  problemSeed_70,
  problemSeed_71,
  problemSeed_72,
  problemSeed_73,
  problemSeed_74,
  problemSeed_75,
  problemSeed_76,
  problemSeed_77,
  problemSeed_78,
  problemSeed_79,
  problemSeed_80,
  problemSeed_81,
  problemSeed_82,
  problemSeed_83,
  problemSeed_84,
  problemSeed_85,
  problemSeed_86,
  problemSeed_87,
  problemSeed_88,
  problemSeed_89,
  problemSeed_90,
  problemSeed_91,
  problemSeed_92,
  problemSeed_93,
  problemSeed_94,
  problemSeed_95,
  problemSeed_96,
  problemSeed_97,
  problemSeed_98,
  problemSeed_99,
  problemSeed_100,
  problemSeed_101,
  problemSeed_102,
  problemSeed_103,
  problemSeed_104,
  problemSeed_105,
  problemSeed_106,
  problemSeed_107,
  problemSeed_108,
  problemSeed_109,
  problemSeed_110,
  problemSeed_111,
  problemSeed_112,
  problemSeed_113,
  problemSeed_114,
  problemSeed_115,
  problemSeed_116,
  problemSeed_117,
  problemSeed_118,
  problemSeed_119,
  problemSeed_120,
  problemSeed_121,
  problemSeed_122,
  problemSeed_123,
  problemSeed_124,
  problemSeed_125,
  problemSeed_126,
  problemSeed_127,
  problemSeed_128,
  problemSeed_129,
  problemSeed_130,
  problemSeed_131,
  problemSeed_132,
  problemSeed_133,
  problemSeed_134,
  problemSeed_135,
  problemSeed_136,
  problemSeed_137,
  problemSeed_138,
  problemSeed_139,
  problemSeed_140,
  problemSeed_141,
  problemSeed_142,
  problemSeed_143,
  problemSeed_144,
  problemSeed_145,
  problemSeed_146,
  problemSeed_147,
  problemSeed_148
];

export const problemInserts: ProblemInsert[] =
  problemSeeds.map(toProblemInsert);
