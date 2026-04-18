package com.example.java_demo.controller;

import com.example.java_demo.model.Repo;
import com.example.java_demo.service.GitHubService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/repos")
public class RepoController {

    private final GitHubService service;

    public RepoController(GitHubService service) {
        this.service = service;
    }

    @GetMapping
    public List<Repo> getRepos(
            @RequestParam(defaultValue = "week") String duration,
            @RequestParam(defaultValue = "10") int limit
    ) {
        return service.getTrending(duration, limit);
    }
}