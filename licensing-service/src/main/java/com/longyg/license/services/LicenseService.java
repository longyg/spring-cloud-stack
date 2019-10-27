package com.longyg.license.services;

import com.longyg.license.config.ServiceConfig;
import com.longyg.license.model.License;
import com.longyg.license.repository.LicenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class LicenseService {
    @Autowired
    private LicenseRepository licenseRepository;

    @Autowired
    private ServiceConfig config;

    public License getLicense(String organizationId, String licenseId) {
        License license = licenseRepository.findByOrganizationIdAndLicenseId(organizationId, licenseId);
        return license.withComment(config.getExampleProperty());
    }

    public List<License> getLicenseByOrg(String organizationId) {
        return licenseRepository.findByOrganizationId(organizationId);
    }

    public String getConfig() {
        return config.getExampleProperty();
    }

    public void saveLicense(License license) {
        license.withId(UUID.randomUUID().toString());
        licenseRepository.save(license);
    }
}
