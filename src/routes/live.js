const express = require('express')
const router = express.Router()

const medialive = require('../aws/elemental/medialive')

router.post('/input-security-groups', (req, res, next) => {
  const { whitelist } = req.body
  const whitelistRules = whitelist.map(cidr => ({
    "Cidr": cidr
  }))
  const params = {
    "WhitelistRules": whitelistRules,
  }

  medialive.createInputSecurityGroup(params, (err, data) => {
    if (err) res.status(err.statusCode).json(err)
    else res.json(data)
  })
})

router.get('/input-security-groups', (req, res, next) => {
  const params = {}

  medialive.listInputSecurityGroups(params, (err, data) => {
    if (err) res.status(err.statusCode).json(err)
    else res.json(data)
  })
})

router.get('/input-security-groups/:groupId', (req, res, next) => {
  const { groupId } = req.params
  const params = {
    "InputSecurityGroupId": groupId
  }

  medialive.describeInputSecurityGroup(params, (err, data) => {
    if (err) res.status(err.statusCode).json(err)
    else res.json(data)
  })
})

router.put('/input-security-groups/:groupId', (req, res, next) => {
  const { groupId } = req.params
  const { whitelist } = req.body
  const whitelistRules = whitelist.map(cidr => ({
    "Cidr": cidr
  }))
  const params = {
    "InputSecurityGroupId": groupId,
    "WhitelistRules": whitelistRules,
  }

  medialive.updateInputSecurityGroup(params, (err, data) => {
    if (err) res.status(err.statusCode).json(err)
    else res.json(data)
  })
})

router.delete('/input-security-groups/:groupId', (req, res, next) => {
  const { groupId } = req.params
  const params = {
    "InputSecurityGroupId": groupId
  }

  medialive.deleteInputSecurityGroup(params, (err, data) => {
    if (err) res.status(err.statusCode).json(err)
    else res.json(data)
  })
})

router.get('/inputs', (req, res, next) => {
  const params = {}

  medialive.listInputs(params, (err, data) => {
    if (err) res.status(err.statusCode).json(err)
    else res.json(data)
  })
})

router.get('/inputs/:inputId', (req, res, next) => {
  const { inputId } = req.params
  const params = {
    "InputId": inputId
  }

  medialive.describeInput(params, (err, data) => {
    if (err) res.status(err.statusCode).json(err)
    else res.json(data)
  })
})

router.delete('/inputs/:inputId', (req, res, next) => {
  const { inputId } = req.params
  const params = {
    "InputId": inputId
  }

  medialive.deleteInput(params, (err, data) => {
    if (err) res.status(err.statusCode).json(err)
    else res.json(data)
  })
})

router.post('/chaanels', (req, rex, next) => {
  // Where is the json inside the console?
  const params = {
    CdiInputSpecification: {
      Resolution: SD | HD | FHD | UHD
    },
    ChannelClass: STANDARD | SINGLE_PIPELINE,
    Destinations: [
      {
        Id: 'STRING_VALUE',
        MediaPackageSettings: [
          {
            ChannelId: 'STRING_VALUE'
          },
          /* more items */
        ],
        MultiplexSettings: {
          MultiplexId: 'STRING_VALUE',
          ProgramName: 'STRING_VALUE'
        },
        Settings: [
          {
            PasswordParam: 'STRING_VALUE',
            StreamName: 'STRING_VALUE',
            Url: 'STRING_VALUE',
            Username: 'STRING_VALUE'
          },
          /* more items */
        ]
      },
      /* more items */
    ],
    EncoderSettings: {
      AudioDescriptions: [ /* required */
        {
          AudioSelectorName: 'STRING_VALUE', /* required */
          Name: 'STRING_VALUE', /* required */
          AudioNormalizationSettings: {
            Algorithm: ITU_1770_1 | ITU_1770_2,
            AlgorithmControl: CORRECT_AUDIO,
            TargetLkfs: 'NUMBER_VALUE'
          },
          AudioType: CLEAN_EFFECTS | HEARING_IMPAIRED | UNDEFINED | VISUAL_IMPAIRED_COMMENTARY,
          AudioTypeControl: FOLLOW_INPUT | USE_CONFIGURED,
          CodecSettings: {
            AacSettings: {
              Bitrate: 'NUMBER_VALUE',
              CodingMode: AD_RECEIVER_MIX | CODING_MODE_1_0 | CODING_MODE_1_1 | CODING_MODE_2_0 | CODING_MODE_5_1,
              InputType: BROADCASTER_MIXED_AD | NORMAL,
              Profile: HEV1 | HEV2 | LC,
              RateControlMode: CBR | VBR,
              RawFormat: LATM_LOAS | NONE,
              SampleRate: 'NUMBER_VALUE',
              Spec: MPEG2 | MPEG4,
              VbrQuality: HIGH | LOW | MEDIUM_HIGH | MEDIUM_LOW
            },
            Ac3Settings: {
              Bitrate: 'NUMBER_VALUE',
              BitstreamMode: COMMENTARY | COMPLETE_MAIN | DIALOGUE | EMERGENCY | HEARING_IMPAIRED | MUSIC_AND_EFFECTS | VISUALLY_IMPAIRED | VOICE_OVER,
              CodingMode: CODING_MODE_1_0 | CODING_MODE_1_1 | CODING_MODE_2_0 | CODING_MODE_3_2_LFE,
              Dialnorm: 'NUMBER_VALUE',
              DrcProfile: FILM_STANDARD | NONE,
              LfeFilter: DISABLED | ENABLED,
              MetadataControl: FOLLOW_INPUT | USE_CONFIGURED
            },
            Eac3Settings: {
              AttenuationControl: ATTENUATE_3_DB | NONE,
              Bitrate: 'NUMBER_VALUE',
              BitstreamMode: COMMENTARY | COMPLETE_MAIN | EMERGENCY | HEARING_IMPAIRED | VISUALLY_IMPAIRED,
              CodingMode: CODING_MODE_1_0 | CODING_MODE_2_0 | CODING_MODE_3_2,
              DcFilter: DISABLED | ENABLED,
              Dialnorm: 'NUMBER_VALUE',
              DrcLine: FILM_LIGHT | FILM_STANDARD | MUSIC_LIGHT | MUSIC_STANDARD | NONE | SPEECH,
              DrcRf: FILM_LIGHT | FILM_STANDARD | MUSIC_LIGHT | MUSIC_STANDARD | NONE | SPEECH,
              LfeControl: LFE | NO_LFE,
              LfeFilter: DISABLED | ENABLED,
              LoRoCenterMixLevel: 'NUMBER_VALUE',
              LoRoSurroundMixLevel: 'NUMBER_VALUE',
              LtRtCenterMixLevel: 'NUMBER_VALUE',
              LtRtSurroundMixLevel: 'NUMBER_VALUE',
              MetadataControl: FOLLOW_INPUT | USE_CONFIGURED,
              PassthroughControl: NO_PASSTHROUGH | WHEN_POSSIBLE,
              PhaseControl: NO_SHIFT | SHIFT_90_DEGREES,
              StereoDownmix: DPL2 | LO_RO | LT_RT | NOT_INDICATED,
              SurroundExMode: DISABLED | ENABLED | NOT_INDICATED,
              SurroundMode: DISABLED | ENABLED | NOT_INDICATED
            },
            Mp2Settings: {
              Bitrate: 'NUMBER_VALUE',
              CodingMode: CODING_MODE_1_0 | CODING_MODE_2_0,
              SampleRate: 'NUMBER_VALUE'
            },
            PassThroughSettings: {
            },
            WavSettings: {
              BitDepth: 'NUMBER_VALUE',
              CodingMode: CODING_MODE_1_0 | CODING_MODE_2_0 | CODING_MODE_4_0 | CODING_MODE_8_0,
              SampleRate: 'NUMBER_VALUE'
            }
          },
          LanguageCode: 'STRING_VALUE',
          LanguageCodeControl: FOLLOW_INPUT | USE_CONFIGURED,
          RemixSettings: {
            ChannelMappings: [ /* required */
              {
                InputChannelLevels: [ /* required */
                  {
                    Gain: 'NUMBER_VALUE', /* required */
                    InputChannel: 'NUMBER_VALUE' /* required */
                  },
                  /* more items */
                ],
                OutputChannel: 'NUMBER_VALUE' /* required */
              },
              /* more items */
            ],
            ChannelsIn: 'NUMBER_VALUE',
            ChannelsOut: 'NUMBER_VALUE'
          },
          StreamName: 'STRING_VALUE'
        },
        /* more items */
      ],
      OutputGroups: [ /* required */
        {
          OutputGroupSettings: { /* required */
            ArchiveGroupSettings: {
              Destination: { /* required */
                DestinationRefId: 'STRING_VALUE'
              },
              ArchiveCdnSettings: {
                ArchiveS3Settings: {
                  CannedAcl: AUTHENTICATED_READ | BUCKET_OWNER_FULL_CONTROL | BUCKET_OWNER_READ | PUBLIC_READ
                }
              },
              RolloverInterval: 'NUMBER_VALUE'
            },
            FrameCaptureGroupSettings: {
              Destination: { /* required */
                DestinationRefId: 'STRING_VALUE'
              },
              FrameCaptureCdnSettings: {
                FrameCaptureS3Settings: {
                  CannedAcl: AUTHENTICATED_READ | BUCKET_OWNER_FULL_CONTROL | BUCKET_OWNER_READ | PUBLIC_READ
                }
              }
            },
            HlsGroupSettings: {
              Destination: { /* required */
                DestinationRefId: 'STRING_VALUE'
              },
              AdMarkers: [
                ADOBE | ELEMENTAL | ELEMENTAL_SCTE35,
                /* more items */
              ],
              BaseUrlContent: 'STRING_VALUE',
              BaseUrlContent1: 'STRING_VALUE',
              BaseUrlManifest: 'STRING_VALUE',
              BaseUrlManifest1: 'STRING_VALUE',
              CaptionLanguageMappings: [
                {
                  CaptionChannel: 'NUMBER_VALUE', /* required */
                  LanguageCode: 'STRING_VALUE', /* required */
                  LanguageDescription: 'STRING_VALUE' /* required */
                },
                /* more items */
              ],
              CaptionLanguageSetting: INSERT | NONE | OMIT,
              ClientCache: DISABLED | ENABLED,
              CodecSpecification: RFC_4281 | RFC_6381,
              ConstantIv: 'STRING_VALUE',
              DirectoryStructure: SINGLE_DIRECTORY | SUBDIRECTORY_PER_STREAM,
              DiscontinuityTags: INSERT | NEVER_INSERT,
              EncryptionType: AES128 | SAMPLE_AES,
              HlsCdnSettings: {
                HlsAkamaiSettings: {
                  ConnectionRetryInterval: 'NUMBER_VALUE',
                  FilecacheDuration: 'NUMBER_VALUE',
                  HttpTransferMode: CHUNKED | NON_CHUNKED,
                  NumRetries: 'NUMBER_VALUE',
                  RestartDelay: 'NUMBER_VALUE',
                  Salt: 'STRING_VALUE',
                  Token: 'STRING_VALUE'
                },
                HlsBasicPutSettings: {
                  ConnectionRetryInterval: 'NUMBER_VALUE',
                  FilecacheDuration: 'NUMBER_VALUE',
                  NumRetries: 'NUMBER_VALUE',
                  RestartDelay: 'NUMBER_VALUE'
                },
                HlsMediaStoreSettings: {
                  ConnectionRetryInterval: 'NUMBER_VALUE',
                  FilecacheDuration: 'NUMBER_VALUE',
                  MediaStoreStorageClass: TEMPORAL,
                  NumRetries: 'NUMBER_VALUE',
                  RestartDelay: 'NUMBER_VALUE'
                },
                HlsS3Settings: {
                  CannedAcl: AUTHENTICATED_READ | BUCKET_OWNER_FULL_CONTROL | BUCKET_OWNER_READ | PUBLIC_READ
                },
                HlsWebdavSettings: {
                  ConnectionRetryInterval: 'NUMBER_VALUE',
                  FilecacheDuration: 'NUMBER_VALUE',
                  HttpTransferMode: CHUNKED | NON_CHUNKED,
                  NumRetries: 'NUMBER_VALUE',
                  RestartDelay: 'NUMBER_VALUE'
                }
              },
              HlsId3SegmentTagging: DISABLED | ENABLED,
              IFrameOnlyPlaylists: DISABLED | STANDARD,
              IncompleteSegmentBehavior: AUTO | SUPPRESS,
              IndexNSegments: 'NUMBER_VALUE',
              InputLossAction: EMIT_OUTPUT | PAUSE_OUTPUT,
              IvInManifest: EXCLUDE | INCLUDE,
              IvSource: EXPLICIT | FOLLOWS_SEGMENT_NUMBER,
              KeepSegments: 'NUMBER_VALUE',
              KeyFormat: 'STRING_VALUE',
              KeyFormatVersions: 'STRING_VALUE',
              KeyProviderSettings: {
                StaticKeySettings: {
                  StaticKeyValue: 'STRING_VALUE', /* required */
                  KeyProviderServer: {
                    Uri: 'STRING_VALUE', /* required */
                    PasswordParam: 'STRING_VALUE',
                    Username: 'STRING_VALUE'
                  }
                }
              },
              ManifestCompression: GZIP | NONE,
              ManifestDurationFormat: FLOATING_POINT | INTEGER,
              MinSegmentLength: 'NUMBER_VALUE',
              Mode: LIVE | VOD,
              OutputSelection: MANIFESTS_AND_SEGMENTS | SEGMENTS_ONLY | VARIANT_MANIFESTS_AND_SEGMENTS,
              ProgramDateTime: EXCLUDE | INCLUDE,
              ProgramDateTimePeriod: 'NUMBER_VALUE',
              RedundantManifest: DISABLED | ENABLED,
              SegmentLength: 'NUMBER_VALUE',
              SegmentationMode: USE_INPUT_SEGMENTATION | USE_SEGMENT_DURATION,
              SegmentsPerSubdirectory: 'NUMBER_VALUE',
              StreamInfResolution: EXCLUDE | INCLUDE,
              TimedMetadataId3Frame: NONE | PRIV | TDRL,
              TimedMetadataId3Period: 'NUMBER_VALUE',
              TimestampDeltaMilliseconds: 'NUMBER_VALUE',
              TsFileMode: SEGMENTED_FILES | SINGLE_FILE
            },
            MediaPackageGroupSettings: {
              Destination: { /* required */
                DestinationRefId: 'STRING_VALUE'
              }
            },
            MsSmoothGroupSettings: {
              Destination: { /* required */
                DestinationRefId: 'STRING_VALUE'
              },
              AcquisitionPointId: 'STRING_VALUE',
              AudioOnlyTimecodeControl: PASSTHROUGH | USE_CONFIGURED_CLOCK,
              CertificateMode: SELF_SIGNED | VERIFY_AUTHENTICITY,
              ConnectionRetryInterval: 'NUMBER_VALUE',
              EventId: 'STRING_VALUE',
              EventIdMode: NO_EVENT_ID | USE_CONFIGURED | USE_TIMESTAMP,
              EventStopBehavior: NONE | SEND_EOS,
              FilecacheDuration: 'NUMBER_VALUE',
              FragmentLength: 'NUMBER_VALUE',
              InputLossAction: EMIT_OUTPUT | PAUSE_OUTPUT,
              NumRetries: 'NUMBER_VALUE',
              RestartDelay: 'NUMBER_VALUE',
              SegmentationMode: USE_INPUT_SEGMENTATION | USE_SEGMENT_DURATION,
              SendDelayMs: 'NUMBER_VALUE',
              SparseTrackType: NONE | SCTE_35 | SCTE_35_WITHOUT_SEGMENTATION,
              StreamManifestBehavior: DO_NOT_SEND | SEND,
              TimestampOffset: 'STRING_VALUE',
              TimestampOffsetMode: USE_CONFIGURED_OFFSET | USE_EVENT_START_DATE
            },
            MultiplexGroupSettings: {
            },
            RtmpGroupSettings: {
              AdMarkers: [
                ON_CUE_POINT_SCTE35,
                /* more items */
              ],
              AuthenticationScheme: AKAMAI | COMMON,
              CacheFullBehavior: DISCONNECT_IMMEDIATELY | WAIT_FOR_SERVER,
              CacheLength: 'NUMBER_VALUE',
              CaptionData: ALL | FIELD1_608 | FIELD1_AND_FIELD2_608,
              InputLossAction: EMIT_OUTPUT | PAUSE_OUTPUT,
              RestartDelay: 'NUMBER_VALUE'
            },
            UdpGroupSettings: {
              InputLossAction: DROP_PROGRAM | DROP_TS | EMIT_PROGRAM,
              TimedMetadataId3Frame: NONE | PRIV | TDRL,
              TimedMetadataId3Period: 'NUMBER_VALUE'
            }
          },
          Outputs: [ /* required */
            {
              OutputSettings: { /* required */
                ArchiveOutputSettings: {
                  ContainerSettings: { /* required */
                    M2tsSettings: {
                      AbsentInputAudioBehavior: DROP | ENCODE_SILENCE,
                      Arib: DISABLED | ENABLED,
                      AribCaptionsPid: 'STRING_VALUE',
                      AribCaptionsPidControl: AUTO | USE_CONFIGURED,
                      AudioBufferModel: ATSC | DVB,
                      AudioFramesPerPes: 'NUMBER_VALUE',
                      AudioPids: 'STRING_VALUE',
                      AudioStreamType: ATSC | DVB,
                      Bitrate: 'NUMBER_VALUE',
                      BufferModel: MULTIPLEX | NONE,
                      CcDescriptor: DISABLED | ENABLED,
                      DvbNitSettings: {
                        NetworkId: 'NUMBER_VALUE', /* required */
                        NetworkName: 'STRING_VALUE', /* required */
                        RepInterval: 'NUMBER_VALUE'
                      },
                      DvbSdtSettings: {
                        OutputSdt: SDT_FOLLOW | SDT_FOLLOW_IF_PRESENT | SDT_MANUAL | SDT_NONE,
                        RepInterval: 'NUMBER_VALUE',
                        ServiceName: 'STRING_VALUE',
                        ServiceProviderName: 'STRING_VALUE'
                      },
                      DvbSubPids: 'STRING_VALUE',
                      DvbTdtSettings: {
                        RepInterval: 'NUMBER_VALUE'
                      },
                      DvbTeletextPid: 'STRING_VALUE',
                      Ebif: NONE | PASSTHROUGH,
                      EbpAudioInterval: VIDEO_AND_FIXED_INTERVALS | VIDEO_INTERVAL,
                      EbpLookaheadMs: 'NUMBER_VALUE',
                      EbpPlacement: VIDEO_AND_AUDIO_PIDS | VIDEO_PID,
                      EcmPid: 'STRING_VALUE',
                      EsRateInPes: EXCLUDE | INCLUDE,
                      EtvPlatformPid: 'STRING_VALUE',
                      EtvSignalPid: 'STRING_VALUE',
                      FragmentTime: 'NUMBER_VALUE',
                      Klv: NONE | PASSTHROUGH,
                      KlvDataPids: 'STRING_VALUE',
                      NielsenId3Behavior: NO_PASSTHROUGH | PASSTHROUGH,
                      NullPacketBitrate: 'NUMBER_VALUE',
                      PatInterval: 'NUMBER_VALUE',
                      PcrControl: CONFIGURED_PCR_PERIOD | PCR_EVERY_PES_PACKET,
                      PcrPeriod: 'NUMBER_VALUE',
                      PcrPid: 'STRING_VALUE',
                      PmtInterval: 'NUMBER_VALUE',
                      PmtPid: 'STRING_VALUE',
                      ProgramNum: 'NUMBER_VALUE',
                      RateMode: CBR | VBR,
                      Scte27Pids: 'STRING_VALUE',
                      Scte35Control: NONE | PASSTHROUGH,
                      Scte35Pid: 'STRING_VALUE',
                      SegmentationMarkers: EBP | EBP_LEGACY | NONE | PSI_SEGSTART | RAI_ADAPT | RAI_SEGSTART,
                      SegmentationStyle: MAINTAIN_CADENCE | RESET_CADENCE,
                      SegmentationTime: 'NUMBER_VALUE',
                      TimedMetadataBehavior: NO_PASSTHROUGH | PASSTHROUGH,
                      TimedMetadataPid: 'STRING_VALUE',
                      TransportStreamId: 'NUMBER_VALUE',
                      VideoPid: 'STRING_VALUE'
                    },
                    RawSettings: {
                    }
                  },
                  Extension: 'STRING_VALUE',
                  NameModifier: 'STRING_VALUE'
                },
                FrameCaptureOutputSettings: {
                  NameModifier: 'STRING_VALUE'
                },
                HlsOutputSettings: {
                  HlsSettings: { /* required */
                    AudioOnlyHlsSettings: {
                      AudioGroupId: 'STRING_VALUE',
                      AudioOnlyImage: {
                        Uri: 'STRING_VALUE', /* required */
                        PasswordParam: 'STRING_VALUE',
                        Username: 'STRING_VALUE'
                      },
                      AudioTrackType: ALTERNATE_AUDIO_AUTO_SELECT | ALTERNATE_AUDIO_AUTO_SELECT_DEFAULT | ALTERNATE_AUDIO_NOT_AUTO_SELECT | AUDIO_ONLY_VARIANT_STREAM,
                      SegmentType: AAC | FMP4
                    },
                    Fmp4HlsSettings: {
                      AudioRenditionSets: 'STRING_VALUE',
                      NielsenId3Behavior: NO_PASSTHROUGH | PASSTHROUGH,
                      TimedMetadataBehavior: NO_PASSTHROUGH | PASSTHROUGH
                    },
                    FrameCaptureHlsSettings: {
                    },
                    StandardHlsSettings: {
                      M3u8Settings: { /* required */
                        AudioFramesPerPes: 'NUMBER_VALUE',
                        AudioPids: 'STRING_VALUE',
                        EcmPid: 'STRING_VALUE',
                        NielsenId3Behavior: NO_PASSTHROUGH | PASSTHROUGH,
                        PatInterval: 'NUMBER_VALUE',
                        PcrControl: CONFIGURED_PCR_PERIOD | PCR_EVERY_PES_PACKET,
                        PcrPeriod: 'NUMBER_VALUE',
                        PcrPid: 'STRING_VALUE',
                        PmtInterval: 'NUMBER_VALUE',
                        PmtPid: 'STRING_VALUE',
                        ProgramNum: 'NUMBER_VALUE',
                        Scte35Behavior: NO_PASSTHROUGH | PASSTHROUGH,
                        Scte35Pid: 'STRING_VALUE',
                        TimedMetadataBehavior: NO_PASSTHROUGH | PASSTHROUGH,
                        TimedMetadataPid: 'STRING_VALUE',
                        TransportStreamId: 'NUMBER_VALUE',
                        VideoPid: 'STRING_VALUE'
                      },
                      AudioRenditionSets: 'STRING_VALUE'
                    }
                  },
                  H265PackagingType: HEV1 | HVC1,
                  NameModifier: 'STRING_VALUE',
                  SegmentModifier: 'STRING_VALUE'
                },
                MediaPackageOutputSettings: {
                },
                MsSmoothOutputSettings: {
                  H265PackagingType: HEV1 | HVC1,
                  NameModifier: 'STRING_VALUE'
                },
                MultiplexOutputSettings: {
                  Destination: { /* required */
                    DestinationRefId: 'STRING_VALUE'
                  }
                },
                RtmpOutputSettings: {
                  Destination: { /* required */
                    DestinationRefId: 'STRING_VALUE'
                  },
                  CertificateMode: SELF_SIGNED | VERIFY_AUTHENTICITY,
                  ConnectionRetryInterval: 'NUMBER_VALUE',
                  NumRetries: 'NUMBER_VALUE'
                },
                UdpOutputSettings: {
                  ContainerSettings: { /* required */
                    M2tsSettings: {
                      AbsentInputAudioBehavior: DROP | ENCODE_SILENCE,
                      Arib: DISABLED | ENABLED,
                      AribCaptionsPid: 'STRING_VALUE',
                      AribCaptionsPidControl: AUTO | USE_CONFIGURED,
                      AudioBufferModel: ATSC | DVB,
                      AudioFramesPerPes: 'NUMBER_VALUE',
                      AudioPids: 'STRING_VALUE',
                      AudioStreamType: ATSC | DVB,
                      Bitrate: 'NUMBER_VALUE',
                      BufferModel: MULTIPLEX | NONE,
                      CcDescriptor: DISABLED | ENABLED,
                      DvbNitSettings: {
                        NetworkId: 'NUMBER_VALUE', /* required */
                        NetworkName: 'STRING_VALUE', /* required */
                        RepInterval: 'NUMBER_VALUE'
                      },
                      DvbSdtSettings: {
                        OutputSdt: SDT_FOLLOW | SDT_FOLLOW_IF_PRESENT | SDT_MANUAL | SDT_NONE,
                        RepInterval: 'NUMBER_VALUE',
                        ServiceName: 'STRING_VALUE',
                        ServiceProviderName: 'STRING_VALUE'
                      },
                      DvbSubPids: 'STRING_VALUE',
                      DvbTdtSettings: {
                        RepInterval: 'NUMBER_VALUE'
                      },
                      DvbTeletextPid: 'STRING_VALUE',
                      Ebif: NONE | PASSTHROUGH,
                      EbpAudioInterval: VIDEO_AND_FIXED_INTERVALS | VIDEO_INTERVAL,
                      EbpLookaheadMs: 'NUMBER_VALUE',
                      EbpPlacement: VIDEO_AND_AUDIO_PIDS | VIDEO_PID,
                      EcmPid: 'STRING_VALUE',
                      EsRateInPes: EXCLUDE | INCLUDE,
                      EtvPlatformPid: 'STRING_VALUE',
                      EtvSignalPid: 'STRING_VALUE',
                      FragmentTime: 'NUMBER_VALUE',
                      Klv: NONE | PASSTHROUGH,
                      KlvDataPids: 'STRING_VALUE',
                      NielsenId3Behavior: NO_PASSTHROUGH | PASSTHROUGH,
                      NullPacketBitrate: 'NUMBER_VALUE',
                      PatInterval: 'NUMBER_VALUE',
                      PcrControl: CONFIGURED_PCR_PERIOD | PCR_EVERY_PES_PACKET,
                      PcrPeriod: 'NUMBER_VALUE',
                      PcrPid: 'STRING_VALUE',
                      PmtInterval: 'NUMBER_VALUE',
                      PmtPid: 'STRING_VALUE',
                      ProgramNum: 'NUMBER_VALUE',
                      RateMode: CBR | VBR,
                      Scte27Pids: 'STRING_VALUE',
                      Scte35Control: NONE | PASSTHROUGH,
                      Scte35Pid: 'STRING_VALUE',
                      SegmentationMarkers: EBP | EBP_LEGACY | NONE | PSI_SEGSTART | RAI_ADAPT | RAI_SEGSTART,
                      SegmentationStyle: MAINTAIN_CADENCE | RESET_CADENCE,
                      SegmentationTime: 'NUMBER_VALUE',
                      TimedMetadataBehavior: NO_PASSTHROUGH | PASSTHROUGH,
                      TimedMetadataPid: 'STRING_VALUE',
                      TransportStreamId: 'NUMBER_VALUE',
                      VideoPid: 'STRING_VALUE'
                    }
                  },
                  Destination: { /* required */
                    DestinationRefId: 'STRING_VALUE'
                  },
                  BufferMsec: 'NUMBER_VALUE',
                  FecOutputSettings: {
                    ColumnDepth: 'NUMBER_VALUE',
                    IncludeFec: COLUMN | COLUMN_AND_ROW,
                    RowLength: 'NUMBER_VALUE'
                  }
                }
              },
              AudioDescriptionNames: [
                'STRING_VALUE',
                /* more items */
              ],
              CaptionDescriptionNames: [
                'STRING_VALUE',
                /* more items */
              ],
              OutputName: 'STRING_VALUE',
              VideoDescriptionName: 'STRING_VALUE'
            },
            /* more items */
          ],
          Name: 'STRING_VALUE'
        },
        /* more items */
      ],
      TimecodeConfig: { /* required */
        Source: EMBEDDED | SYSTEMCLOCK | ZEROBASED, /* required */
        SyncThreshold: 'NUMBER_VALUE'
      },
      VideoDescriptions: [ /* required */
        {
          Name: 'STRING_VALUE', /* required */
          CodecSettings: {
            FrameCaptureSettings: {
              CaptureInterval: 'NUMBER_VALUE',
              CaptureIntervalUnits: MILLISECONDS | SECONDS
            },
            H264Settings: {
              AdaptiveQuantization: AUTO | HIGH | HIGHER | LOW | MAX | MEDIUM | OFF,
              AfdSignaling: AUTO | FIXED | NONE,
              Bitrate: 'NUMBER_VALUE',
              BufFillPct: 'NUMBER_VALUE',
              BufSize: 'NUMBER_VALUE',
              ColorMetadata: IGNORE | INSERT,
              ColorSpaceSettings: {
                ColorSpacePassthroughSettings: {
                },
                Rec601Settings: {
                },
                Rec709Settings: {
                }
              },
              EntropyEncoding: CABAC | CAVLC,
              FilterSettings: {
                TemporalFilterSettings: {
                  PostFilterSharpening: AUTO | DISABLED | ENABLED,
                  Strength: AUTO | STRENGTH_1 | STRENGTH_2 | STRENGTH_3 | STRENGTH_4 | STRENGTH_5 | STRENGTH_6 | STRENGTH_7 | STRENGTH_8 | STRENGTH_9 | STRENGTH_10 | STRENGTH_11 | STRENGTH_12 | STRENGTH_13 | STRENGTH_14 | STRENGTH_15 | STRENGTH_16
                }
              },
              FixedAfd: AFD_0000 | AFD_0010 | AFD_0011 | AFD_0100 | AFD_1000 | AFD_1001 | AFD_1010 | AFD_1011 | AFD_1101 | AFD_1110 | AFD_1111,
              FlickerAq: DISABLED | ENABLED,
              ForceFieldPictures: DISABLED | ENABLED,
              FramerateControl: INITIALIZE_FROM_SOURCE | SPECIFIED,
              FramerateDenominator: 'NUMBER_VALUE',
              FramerateNumerator: 'NUMBER_VALUE',
              GopBReference: DISABLED | ENABLED,
              GopClosedCadence: 'NUMBER_VALUE',
              GopNumBFrames: 'NUMBER_VALUE',
              GopSize: 'NUMBER_VALUE',
              GopSizeUnits: FRAMES | SECONDS,
              Level: H264_LEVEL_1 | H264_LEVEL_1_1 | H264_LEVEL_1_2 | H264_LEVEL_1_3 | H264_LEVEL_2 | H264_LEVEL_2_1 | H264_LEVEL_2_2 | H264_LEVEL_3 | H264_LEVEL_3_1 | H264_LEVEL_3_2 | H264_LEVEL_4 | H264_LEVEL_4_1 | H264_LEVEL_4_2 | H264_LEVEL_5 | H264_LEVEL_5_1 | H264_LEVEL_5_2 | H264_LEVEL_AUTO,
              LookAheadRateControl: HIGH | LOW | MEDIUM,
              MaxBitrate: 'NUMBER_VALUE',
              MinIInterval: 'NUMBER_VALUE',
              NumRefFrames: 'NUMBER_VALUE',
              ParControl: INITIALIZE_FROM_SOURCE | SPECIFIED,
              ParDenominator: 'NUMBER_VALUE',
              ParNumerator: 'NUMBER_VALUE',
              Profile: BASELINE | HIGH | HIGH_10BIT | HIGH_422 | HIGH_422_10BIT | MAIN,
              QualityLevel: ENHANCED_QUALITY | STANDARD_QUALITY,
              QvbrQualityLevel: 'NUMBER_VALUE',
              RateControlMode: CBR | MULTIPLEX | QVBR | VBR,
              ScanType: INTERLACED | PROGRESSIVE,
              SceneChangeDetect: DISABLED | ENABLED,
              Slices: 'NUMBER_VALUE',
              Softness: 'NUMBER_VALUE',
              SpatialAq: DISABLED | ENABLED,
              SubgopLength: DYNAMIC | FIXED,
              Syntax: DEFAULT | RP2027,
              TemporalAq: DISABLED | ENABLED,
              TimecodeInsertion: DISABLED | PIC_TIMING_SEI
            },
            H265Settings: {
              FramerateDenominator: 'NUMBER_VALUE', /* required */
              FramerateNumerator: 'NUMBER_VALUE', /* required */
              AdaptiveQuantization: AUTO | HIGH | HIGHER | LOW | MAX | MEDIUM | OFF,
              AfdSignaling: AUTO | FIXED | NONE,
              AlternativeTransferFunction: INSERT | OMIT,
              Bitrate: 'NUMBER_VALUE',
              BufSize: 'NUMBER_VALUE',
              ColorMetadata: IGNORE | INSERT,
              ColorSpaceSettings: {
                ColorSpacePassthroughSettings: {
                },
                Hdr10Settings: {
                  MaxCll: 'NUMBER_VALUE',
                  MaxFall: 'NUMBER_VALUE'
                },
                Rec601Settings: {
                },
                Rec709Settings: {
                }
              },
              FilterSettings: {
                TemporalFilterSettings: {
                  PostFilterSharpening: AUTO | DISABLED | ENABLED,
                  Strength: AUTO | STRENGTH_1 | STRENGTH_2 | STRENGTH_3 | STRENGTH_4 | STRENGTH_5 | STRENGTH_6 | STRENGTH_7 | STRENGTH_8 | STRENGTH_9 | STRENGTH_10 | STRENGTH_11 | STRENGTH_12 | STRENGTH_13 | STRENGTH_14 | STRENGTH_15 | STRENGTH_16
                }
              },
              FixedAfd: AFD_0000 | AFD_0010 | AFD_0011 | AFD_0100 | AFD_1000 | AFD_1001 | AFD_1010 | AFD_1011 | AFD_1101 | AFD_1110 | AFD_1111,
              FlickerAq: DISABLED | ENABLED,
              GopClosedCadence: 'NUMBER_VALUE',
              GopSize: 'NUMBER_VALUE',
              GopSizeUnits: FRAMES | SECONDS,
              Level: H265_LEVEL_1 | H265_LEVEL_2 | H265_LEVEL_2_1 | H265_LEVEL_3 | H265_LEVEL_3_1 | H265_LEVEL_4 | H265_LEVEL_4_1 | H265_LEVEL_5 | H265_LEVEL_5_1 | H265_LEVEL_5_2 | H265_LEVEL_6 | H265_LEVEL_6_1 | H265_LEVEL_6_2 | H265_LEVEL_AUTO,
              LookAheadRateControl: HIGH | LOW | MEDIUM,
              MaxBitrate: 'NUMBER_VALUE',
              MinIInterval: 'NUMBER_VALUE',
              ParDenominator: 'NUMBER_VALUE',
              ParNumerator: 'NUMBER_VALUE',
              Profile: MAIN | MAIN_10BIT,
              QvbrQualityLevel: 'NUMBER_VALUE',
              RateControlMode: CBR | MULTIPLEX | QVBR,
              ScanType: INTERLACED | PROGRESSIVE,
              SceneChangeDetect: DISABLED | ENABLED,
              Slices: 'NUMBER_VALUE',
              Tier: HIGH | MAIN,
              TimecodeInsertion: DISABLED | PIC_TIMING_SEI
            },
            Mpeg2Settings: {
              FramerateDenominator: 'NUMBER_VALUE', /* required */
              FramerateNumerator: 'NUMBER_VALUE', /* required */
              AdaptiveQuantization: AUTO | HIGH | LOW | MEDIUM | OFF,
              AfdSignaling: AUTO | FIXED | NONE,
              ColorMetadata: IGNORE | INSERT,
              ColorSpace: AUTO | PASSTHROUGH,
              DisplayAspectRatio: DISPLAYRATIO16X9 | DISPLAYRATIO4X3,
              FilterSettings: {
                TemporalFilterSettings: {
                  PostFilterSharpening: AUTO | DISABLED | ENABLED,
                  Strength: AUTO | STRENGTH_1 | STRENGTH_2 | STRENGTH_3 | STRENGTH_4 | STRENGTH_5 | STRENGTH_6 | STRENGTH_7 | STRENGTH_8 | STRENGTH_9 | STRENGTH_10 | STRENGTH_11 | STRENGTH_12 | STRENGTH_13 | STRENGTH_14 | STRENGTH_15 | STRENGTH_16
                }
              },
              FixedAfd: AFD_0000 | AFD_0010 | AFD_0011 | AFD_0100 | AFD_1000 | AFD_1001 | AFD_1010 | AFD_1011 | AFD_1101 | AFD_1110 | AFD_1111,
              GopClosedCadence: 'NUMBER_VALUE',
              GopNumBFrames: 'NUMBER_VALUE',
              GopSize: 'NUMBER_VALUE',
              GopSizeUnits: FRAMES | SECONDS,
              ScanType: INTERLACED | PROGRESSIVE,
              SubgopLength: DYNAMIC | FIXED,
              TimecodeInsertion: DISABLED | GOP_TIMECODE
            }
          },
          Height: 'NUMBER_VALUE',
          RespondToAfd: NONE | PASSTHROUGH | RESPOND,
          ScalingBehavior: DEFAULT | STRETCH_TO_OUTPUT,
          Sharpness: 'NUMBER_VALUE',
          Width: 'NUMBER_VALUE'
        },
        /* more items */
      ],
      AvailBlanking: {
        AvailBlankingImage: {
          Uri: 'STRING_VALUE', /* required */
          PasswordParam: 'STRING_VALUE',
          Username: 'STRING_VALUE'
        },
        State: DISABLED | ENABLED
      },
      AvailConfiguration: {
        AvailSettings: {
          Scte35SpliceInsert: {
            AdAvailOffset: 'NUMBER_VALUE',
            NoRegionalBlackoutFlag: FOLLOW | IGNORE,
            WebDeliveryAllowedFlag: FOLLOW | IGNORE
          },
          Scte35TimeSignalApos: {
            AdAvailOffset: 'NUMBER_VALUE',
            NoRegionalBlackoutFlag: FOLLOW | IGNORE,
            WebDeliveryAllowedFlag: FOLLOW | IGNORE
          }
        }
      },
      BlackoutSlate: {
        BlackoutSlateImage: {
          Uri: 'STRING_VALUE', /* required */
          PasswordParam: 'STRING_VALUE',
          Username: 'STRING_VALUE'
        },
        NetworkEndBlackout: DISABLED | ENABLED,
        NetworkEndBlackoutImage: {
          Uri: 'STRING_VALUE', /* required */
          PasswordParam: 'STRING_VALUE',
          Username: 'STRING_VALUE'
        },
        NetworkId: 'STRING_VALUE',
        State: DISABLED | ENABLED
      },
      CaptionDescriptions: [
        {
          CaptionSelectorName: 'STRING_VALUE', /* required */
          Name: 'STRING_VALUE', /* required */
          DestinationSettings: {
            AribDestinationSettings: {
            },
            BurnInDestinationSettings: {
              Alignment: CENTERED | LEFT | SMART,
              BackgroundColor: BLACK | NONE | WHITE,
              BackgroundOpacity: 'NUMBER_VALUE',
              Font: {
                Uri: 'STRING_VALUE', /* required */
                PasswordParam: 'STRING_VALUE',
                Username: 'STRING_VALUE'
              },
              FontColor: BLACK | BLUE | GREEN | RED | WHITE | YELLOW,
              FontOpacity: 'NUMBER_VALUE',
              FontResolution: 'NUMBER_VALUE',
              FontSize: 'STRING_VALUE',
              OutlineColor: BLACK | BLUE | GREEN | RED | WHITE | YELLOW,
              OutlineSize: 'NUMBER_VALUE',
              ShadowColor: BLACK | NONE | WHITE,
              ShadowOpacity: 'NUMBER_VALUE',
              ShadowXOffset: 'NUMBER_VALUE',
              ShadowYOffset: 'NUMBER_VALUE',
              TeletextGridControl: FIXED | SCALED,
              XPosition: 'NUMBER_VALUE',
              YPosition: 'NUMBER_VALUE'
            },
            DvbSubDestinationSettings: {
              Alignment: CENTERED | LEFT | SMART,
              BackgroundColor: BLACK | NONE | WHITE,
              BackgroundOpacity: 'NUMBER_VALUE',
              Font: {
                Uri: 'STRING_VALUE', /* required */
                PasswordParam: 'STRING_VALUE',
                Username: 'STRING_VALUE'
              },
              FontColor: BLACK | BLUE | GREEN | RED | WHITE | YELLOW,
              FontOpacity: 'NUMBER_VALUE',
              FontResolution: 'NUMBER_VALUE',
              FontSize: 'STRING_VALUE',
              OutlineColor: BLACK | BLUE | GREEN | RED | WHITE | YELLOW,
              OutlineSize: 'NUMBER_VALUE',
              ShadowColor: BLACK | NONE | WHITE,
              ShadowOpacity: 'NUMBER_VALUE',
              ShadowXOffset: 'NUMBER_VALUE',
              ShadowYOffset: 'NUMBER_VALUE',
              TeletextGridControl: FIXED | SCALED,
              XPosition: 'NUMBER_VALUE',
              YPosition: 'NUMBER_VALUE'
            },
            EbuTtDDestinationSettings: {
              CopyrightHolder: 'STRING_VALUE',
              FillLineGap: DISABLED | ENABLED,
              FontFamily: 'STRING_VALUE',
              StyleControl: EXCLUDE | INCLUDE
            },
            EmbeddedDestinationSettings: {
            },
            EmbeddedPlusScte20DestinationSettings: {
            },
            RtmpCaptionInfoDestinationSettings: {
            },
            Scte20PlusEmbeddedDestinationSettings: {
            },
            Scte27DestinationSettings: {
            },
            SmpteTtDestinationSettings: {
            },
            TeletextDestinationSettings: {
            },
            TtmlDestinationSettings: {
              StyleControl: PASSTHROUGH | USE_CONFIGURED
            },
            WebvttDestinationSettings: {
              StyleControl: NO_STYLE_DATA | PASSTHROUGH
            }
          },
          LanguageCode: 'STRING_VALUE',
          LanguageDescription: 'STRING_VALUE'
        },
        /* more items */
      ],
      FeatureActivations: {
        InputPrepareScheduleActions: DISABLED | ENABLED
      },
      GlobalConfiguration: {
        InitialAudioGain: 'NUMBER_VALUE',
        InputEndAction: NONE | SWITCH_AND_LOOP_INPUTS,
        InputLossBehavior: {
          BlackFrameMsec: 'NUMBER_VALUE',
          InputLossImageColor: 'STRING_VALUE',
          InputLossImageSlate: {
            Uri: 'STRING_VALUE', /* required */
            PasswordParam: 'STRING_VALUE',
            Username: 'STRING_VALUE'
          },
          InputLossImageType: COLOR | SLATE,
          RepeatFrameMsec: 'NUMBER_VALUE'
        },
        OutputLockingMode: EPOCH_LOCKING | PIPELINE_LOCKING,
        OutputTimingSource: INPUT_CLOCK | SYSTEM_CLOCK,
        SupportLowFramerateInputs: DISABLED | ENABLED
      },
      MotionGraphicsConfiguration: {
        MotionGraphicsSettings: { /* required */
          HtmlMotionGraphicsSettings: {
          }
        },
        MotionGraphicsInsertion: DISABLED | ENABLED
      },
      NielsenConfiguration: {
        DistributorId: 'STRING_VALUE',
        NielsenPcmToId3Tagging: DISABLED | ENABLED
      }
    },
    InputAttachments: [
      {
        AutomaticInputFailoverSettings: {
          SecondaryInputId: 'STRING_VALUE', /* required */
          ErrorClearTimeMsec: 'NUMBER_VALUE',
          FailoverConditions: [
            {
              FailoverConditionSettings: {
                AudioSilenceSettings: {
                  AudioSelectorName: 'STRING_VALUE', /* required */
                  AudioSilenceThresholdMsec: 'NUMBER_VALUE'
                },
                InputLossSettings: {
                  InputLossThresholdMsec: 'NUMBER_VALUE'
                },
                VideoBlackSettings: {
                  BlackDetectThreshold: 'NUMBER_VALUE',
                  VideoBlackThresholdMsec: 'NUMBER_VALUE'
                }
              }
            },
            /* more items */
          ],
          InputPreference: EQUAL_INPUT_PREFERENCE | PRIMARY_INPUT_PREFERRED
        },
        InputAttachmentName: 'STRING_VALUE',
        InputId: 'STRING_VALUE',
        InputSettings: {
          AudioSelectors: [
            {
              Name: 'STRING_VALUE', /* required */
              SelectorSettings: {
                AudioHlsRenditionSelection: {
                  GroupId: 'STRING_VALUE', /* required */
                  Name: 'STRING_VALUE' /* required */
                },
                AudioLanguageSelection: {
                  LanguageCode: 'STRING_VALUE', /* required */
                  LanguageSelectionPolicy: LOOSE | STRICT
                },
                AudioPidSelection: {
                  Pid: 'NUMBER_VALUE' /* required */
                },
                AudioTrackSelection: {
                  Tracks: [ /* required */
                    {
                      Track: 'NUMBER_VALUE' /* required */
                    },
                    /* more items */
                  ]
                }
              }
            },
            /* more items */
          ],
          CaptionSelectors: [
            {
              Name: 'STRING_VALUE', /* required */
              LanguageCode: 'STRING_VALUE',
              SelectorSettings: {
                AncillarySourceSettings: {
                  SourceAncillaryChannelNumber: 'NUMBER_VALUE'
                },
                AribSourceSettings: {
                },
                DvbSubSourceSettings: {
                  OcrLanguage: DEU | ENG | FRA | NLD | POR | SPA,
                  Pid: 'NUMBER_VALUE'
                },
                EmbeddedSourceSettings: {
                  Convert608To708: DISABLED | UPCONVERT,
                  Scte20Detection: AUTO | OFF,
                  Source608ChannelNumber: 'NUMBER_VALUE',
                  Source608TrackNumber: 'NUMBER_VALUE'
                },
                Scte20SourceSettings: {
                  Convert608To708: DISABLED | UPCONVERT,
                  Source608ChannelNumber: 'NUMBER_VALUE'
                },
                Scte27SourceSettings: {
                  OcrLanguage: DEU | ENG | FRA | NLD | POR | SPA,
                  Pid: 'NUMBER_VALUE'
                },
                TeletextSourceSettings: {
                  OutputRectangle: {
                    Height: 'NUMBER_VALUE', /* required */
                    LeftOffset: 'NUMBER_VALUE', /* required */
                    TopOffset: 'NUMBER_VALUE', /* required */
                    Width: 'NUMBER_VALUE' /* required */
                  },
                  PageNumber: 'STRING_VALUE'
                }
              }
            },
            /* more items */
          ],
          DeblockFilter: DISABLED | ENABLED,
          DenoiseFilter: DISABLED | ENABLED,
          FilterStrength: 'NUMBER_VALUE',
          InputFilter: AUTO | DISABLED | FORCED,
          NetworkInputSettings: {
            HlsInputSettings: {
              Bandwidth: 'NUMBER_VALUE',
              BufferSegments: 'NUMBER_VALUE',
              Retries: 'NUMBER_VALUE',
              RetryInterval: 'NUMBER_VALUE',
              Scte35Source: MANIFEST | SEGMENTS
            },
            ServerValidation: CHECK_CRYPTOGRAPHY_AND_VALIDATE_NAME | CHECK_CRYPTOGRAPHY_ONLY
          },
          Smpte2038DataPreference: IGNORE | PREFER,
          SourceEndBehavior: CONTINUE | LOOP,
          VideoSelector: {
            ColorSpace: FOLLOW | HDR10 | HLG_2020 | REC_601 | REC_709,
            ColorSpaceSettings: {
              Hdr10Settings: {
                MaxCll: 'NUMBER_VALUE',
                MaxFall: 'NUMBER_VALUE'
              }
            },
            ColorSpaceUsage: FALLBACK | FORCE,
            SelectorSettings: {
              VideoSelectorPid: {
                Pid: 'NUMBER_VALUE'
              },
              VideoSelectorProgramId: {
                ProgramId: 'NUMBER_VALUE'
              }
            }
          }
        }
      },
      /* more items */
    ],
    InputSpecification: {
      Codec: MPEG2 | AVC | HEVC,
      MaximumBitrate: MAX_10_MBPS | MAX_20_MBPS | MAX_50_MBPS,
      Resolution: SD | HD | UHD
    },
    LogLevel: ERROR | WARNING | INFO | DEBUG | DISABLED,
    Name: 'STRING_VALUE',
    RequestId: 'STRING_VALUE',
    Reserved: 'STRING_VALUE',
    RoleArn: 'STRING_VALUE',
    Tags: {
      '<__string>': 'STRING_VALUE',
      /* '<__string>': ... */
    },
    Vpc: {
      SubnetIds: [ /* required */
        'STRING_VALUE',
        /* more items */
      ],
      PublicAddressAllocationIds: [
        'STRING_VALUE',
        /* more items */
      ],
      SecurityGroupIds: [
        'STRING_VALUE',
        /* more items */
      ]
    }
  }

  medialive.createChannel(params, function (err, data) {
    if (err) res.status(err.statusCode).json(err)
    else res.json(data)
  })
})

router.get('/channels', (req, res, next) => {
  const params = {}

  medialive.listChannels(params, (err, data) => {
    if (err) res.status(err.statusCode).json(err)
    else res.json(data)
  })
})

router.get('/channels/:channelId', (req, res, next) => {
  const { channelId } = req.params
  const params = {
    "ChannelId": channelId
  }

  medialive.describeChannel(params, (err, data) => {
    if (err) res.status(err.statusCode).json(err)
    else res.json(data)
  })
})

router.delete('/channels/:channelId', (req, res, next) => {
  const { channelId } = req.params
  const params = {
    "ChannelId": channelId
  }

  medialive.deleteChannel(params, (err, data) => {
    if (err) res.status(err.statusCode).json(err)
    else res.json(data)
  })
})

module.exports = router