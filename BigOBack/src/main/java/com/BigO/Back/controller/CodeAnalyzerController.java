package com.BigO.Back.controller;


import com.BigO.Back.dto.CodeRequest;
import com.BigO.Back.service.CodeAnalyzerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/analyze")
@CrossOrigin(origins = "*") // React se call allow
public class CodeAnalyzerController {

    @Autowired
    private CodeAnalyzerService codeAnalyzerService;

    @PostMapping
    public String analyzeCode(@RequestBody CodeRequest request) {
        return codeAnalyzerService.analyze(request.getCode());
    }
}

