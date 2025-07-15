package com.BigO.Back.service;

import com.github.javaparser.JavaParser;
import com.github.javaparser.ParseResult;
import com.github.javaparser.ParseStart;
import com.github.javaparser.Providers;
import com.github.javaparser.ast.CompilationUnit;
import com.github.javaparser.ast.Node;
import com.github.javaparser.ast.NodeList;
import com.github.javaparser.ast.body.MethodDeclaration;
import com.github.javaparser.ast.expr.*;
import com.github.javaparser.ast.stmt.*;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class CodeAnalyzerService {

    public String analyze(String code) {
        try {
            JavaParser parser = new JavaParser();
            ParseResult<CompilationUnit> result = parser.parse(ParseStart.COMPILATION_UNIT, Providers.provider(code));

            if (result.isSuccessful() && result.getResult().isPresent()) {
                CompilationUnit cu = result.getResult().get();

                // Analyze loops
                List<String> loopTypes = detectAllLoopTypes(cu);
                String loopComplexity = calculateCombinedLoopComplexity(loopTypes);

                // Analyze recursion
                String recursionComplexity = detectRecursionComplexity(cu, loopTypes);

                // Merge
                if (recursionComplexity != null && !recursionComplexity.equals("O(1)")) {
                    if (!loopComplexity.equals("O(1)")) {
                        return "Combined: " + loopComplexity + " * " + recursionComplexity;
                    }
                    return recursionComplexity;
                }
                return loopComplexity;
            } else {
                return "❌ Parsing failed: Invalid Java code.";
            }

        } catch (Exception e) {
            return "❌ Parsing Error: " + e.getMessage();
        }
    }

    // Detect all loop types
    private List<String> detectAllLoopTypes(CompilationUnit cu) {
        List<String> loopTypes = new ArrayList<>();

        List<ForStmt> forLoops = cu.findAll(ForStmt.class);
        List<WhileStmt> whileLoops = cu.findAll(WhileStmt.class);
        List<DoStmt> doLoops = cu.findAll(DoStmt.class);

        for (ForStmt loop : forLoops) {
            loopTypes.add(getLoopType(loop.getUpdate()));
        }
        for (WhileStmt ignored : whileLoops) {
            loopTypes.add("linear"); // Assume linear for while
        }
        for (DoStmt ignored : doLoops) {
            loopTypes.add("linear");
        }

        return loopTypes;
    }

    // Check loop type from update expression
    private String getLoopType(NodeList<Expression> updates) {
        for (Expression expr : updates) {
            if (expr instanceof UnaryExpr) {
                return "linear"; // i++, i--
            }
            if (expr instanceof AssignExpr) {
                AssignExpr assign = (AssignExpr) expr;
                Expression value = assign.getValue();
                if (assign.getOperator() == AssignExpr.Operator.MULTIPLY
                        || assign.getOperator() == AssignExpr.Operator.DIVIDE) {
                    return "log";
                }
                if (value instanceof BinaryExpr) {
                    BinaryExpr binary = (BinaryExpr) value;
                    if (binary.getOperator() == BinaryExpr.Operator.MULTIPLY ||
                            binary.getOperator() == BinaryExpr.Operator.DIVIDE) {
                        return "log";
                    }
                }
            }
        }
        return "linear"; // default
    }

    // Combine loops into complexity
    private String calculateCombinedLoopComplexity(List<String> loopTypes) {
        if (loopTypes.isEmpty()) return "O(1)";

        int linearCount = 0, logCount = 0;
        for (String type : loopTypes) {
            if (type.equals("linear")) linearCount++;
            else if (type.equals("log")) logCount++;
        }

        // Mixed cases
        if (linearCount > 0 && logCount > 0) {
            if (linearCount == 1 && logCount == 1) return "O(n log n)";
            return "O(n^" + linearCount + " * (log n)^" + logCount + ")";
        }

        // Pure linear
        if (linearCount > 0) {
            if (linearCount == 1) return "O(n)";
            return "O(n^" + linearCount + ")";
        }

        // Pure log
        if (logCount > 0) {
            if (logCount == 1) return "O(log n)";
            return "O((log n)^" + logCount + ")";
        }

        return "O(1)";
    }

    // Detect recursion and its nature
    private String detectRecursionComplexity(CompilationUnit cu, List<String> loopTypes) {
        List<MethodDeclaration> methods = cu.findAll(MethodDeclaration.class);

        for (MethodDeclaration method : methods) {
            String methodName = method.getNameAsString();
            List<MethodCallExpr> calls = method.findAll(MethodCallExpr.class);

            int selfCalls = 0;
            for (MethodCallExpr call : calls) {
                if (call.getNameAsString().equals(methodName)) {
                    selfCalls++;
                }
            }

            if (selfCalls == 1) {
                if (!loopTypes.isEmpty()) return "O(n!) — Recursive + Loops (Factorial)";
                return "O(n) — Linear Recursion";
            } else if (selfCalls == 2) {
                return "O(2^n) — Exponential Recursion";
            } else if (selfCalls > 2) {
                return "O(k^n) — k recursive calls";
            }
        }
        return null;
    }
}
